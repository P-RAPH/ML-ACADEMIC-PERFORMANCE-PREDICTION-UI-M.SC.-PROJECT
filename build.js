const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  ImageRun, PageBreak, LevelFormat, convertInchesToTwip, TabStopType,
  TabStopPosition, Header, Footer, PageNumber, NumberFormat, VerticalAlign
} = require("docx");

const FONT = "Times New Roman";

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    spacing: { before: 200, after: 300 },
    children: [new TextRun({ text, bold: true, size: 32, font: FONT, color: "000000" })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 200 },
    children: [new TextRun({ text, bold: true, size: 27, font: FONT, color: "000000" })],
  });
}

function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 160 },
    children: [new TextRun({ text, bold: true, italics: false, size: 24, font: FONT, color: "000000" })],
  });
}

function p(text, opts = {}) {
  const runs = Array.isArray(text) ? text : [new TextRun({ text, size: 24, font: FONT })];
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    spacing: { after: 200, line: 360, lineRule: "auto" },
    indent: opts.indent ? { firstLine: 480 } : undefined,
    children: runs,
  });
}

function pc(text, opts = {}) {
  // centered plain paragraph
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: opts.after ?? 200 },
    children: [new TextRun({ text, size: opts.size ?? 24, font: FONT, bold: !!opts.bold, italics: !!opts.italics })],
  });
}

function bulletItem(text) {
  return new Paragraph({
    numbering: { reference: "bullet-list", level: 0 },
    spacing: { after: 120, line: 300, lineRule: "auto" },
    children: [new TextRun({ text, size: 24, font: FONT })],
  });
}

function numberedItem(text, ref = "num-list") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 120, line: 300, lineRule: "auto" },
    children: [new TextRun({ text, size: 24, font: FONT })],
  });
}

function refEntry(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 200, line: 276, lineRule: "auto" },
    indent: { left: 480, hanging: 480 },
    children: [new TextRun({ text, size: 24, font: FONT })],
  });
}

function figureImage(path, widthPx, heightPx, caption) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 120 },
      children: [new ImageRun({ data: fs.readFileSync(path), transformation: { width: widthPx, height: heightPx }, type: "png" })],
    }),
    pc(caption, { size: 22, italics: true, after: 300 }),
  ];
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 2000, type: WidthType.DXA },
    shading: opts.header ? { type: ShadingType.CLEAR, fill: "D9D9D9" } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text: String(text), bold: !!opts.header, size: 21, font: FONT })],
    })],
  });
}

function makeTable(headers, rows, widths) {
  const headerRow = new TableRow({
    children: headers.map((hText, i) => cell(hText, { header: true, center: true, width: widths[i] })),
    tableHeader: true,
  });
  const bodyRows = rows.map(r => new TableRow({
    children: r.map((c, i) => cell(c, { center: i > 0, width: widths[i] })),
  }));
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [headerRow, ...bodyRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "000000" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 2, color: "808080" },
      insideVertical: { style: BorderStyle.SINGLE, size: 2, color: "808080" },
    },
  });
}

module.exports = { fs, Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, ImageRun, PageBreak,
  LevelFormat, convertInchesToTwip, TabStopType, TabStopPosition, Header, Footer, PageNumber,
  NumberFormat, FONT, h1, h2, h3, p, pc, bulletItem, numberedItem, refEntry, figureImage, cell, makeTable };
