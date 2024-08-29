declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

import jsPDF from "jspdf";
import "jspdf-autotable";

interface Content {
  data: any[];
  columns: string[];
  logo?: string;
  headers?: string[];
  title?: string;
}

interface Attribute {
  width?: number;
  style?: string;
  font?: string;
  fontSize?: number;
  color?: string;
  uppercaseTitle?: boolean;
  language?:
    | "en"
    | "de"
    | "fr"
    | "es"
    | "pt"
    | "it"
    | "ru"
    | "ja"
    | "ko"
    | "zh";
  themes?: "grid" | "striped" | "plain" | "first" | "last";
  logoHeight?: number;
  logoWidth?: number;
}

const ExportPDFTable = async(
  filename: string,
  content: Content,
  attributes?: Attribute
): Promise<void> => {
  const pdfDocument = new jsPDF();
  const logoHeight = attributes?.logoHeight || 30;
  const logoWidth = attributes?.logoWidth || 30;
  let headerStartY = 20;
  const headerLineHeight = 5;
  const titleOffsetY = 2;
  const pageNumberOffsetY = 10;

  if (content.logo) {
    const base64Image = await convertToBase64(content.logo);
    pdfDocument.addImage(base64Image, "JPEG", 15, 10, logoWidth, logoHeight);
    headerStartY = 10 + logoHeight + 10;
  }

  pdfDocument.setFontSize(10);
  content.headers?.forEach((header: string, index: number) => {
    pdfDocument.text(header, 15, headerStartY + index * headerLineHeight);
  });

  if (attributes?.language) {
    pdfDocument.setLanguage(attributes.language);
  }
  pdfDocument.setFontSize(attributes?.fontSize || 12);
  pdfDocument.setFont(attributes?.font || "Helvetica");
  pdfDocument.setTextColor(attributes?.color || "#000000");

  const rows = content.data?.map((item) => [item.name, item.age, item.country]);
  const numberOfHeaders = content.headers?.length || 0;
  const tableStartY = headerStartY + numberOfHeaders * headerLineHeight + 5;

  if (content.title) {
    pdfDocument.setFont(attributes?.font || "Helvetica", "bold");
    pdfDocument.setFontSize(14);
    pdfDocument.text(
      attributes?.uppercaseTitle ? content.title.toUpperCase() : content.title,
      15,
      tableStartY - titleOffsetY
    );
  }

  const pageHeight = pdfDocument.internal.pageSize.height;
  const pageWidth = pdfDocument.internal.pageSize.width;
  const totalPages = pdfDocument.internal.pages.length;

  const addPageNumber = (pageNumber: number) => {
    pdfDocument.setFontSize(10);
    pdfDocument.text(
      `Page ${pageNumber} of ${totalPages - 1}`,
      pageWidth - 20,
      pageHeight - pageNumberOffsetY,
      {
        align: "right",
      }
    );
  };

  pdfDocument.autoTable({
    head: [content.columns],
    body: rows,
    startY: tableStartY,
    didDrawPage: (data: { pageNumber: number }) => {
      const pageNumber = data.pageNumber;
      addPageNumber(pageNumber);
    },
  });

  pdfDocument.save(`${filename}.pdf`);
}
const convertToBase64 = async (imagePath: string): Promise<string> => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to base64:", error);
    alert("Error converting image. Please check the path and try again.");
    throw error;
  }
};


export default ExportPDFTable;