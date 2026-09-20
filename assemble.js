const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, Header, Footer, PageNumber, NumberFormat, LevelFormat, FONT
} = require("./build.js");
const fs = require("fs");

const { titlePage, abstract, toc } = require("./main.js");
const { chapterOne } = require("./ch1.js");
const { chapterTwo } = require("./ch2.js");
const { chapterThree } = require("./ch3.js");
const { chapterFour } = require("./ch4.js");
const { chapterFive, references } = require("./ch5.js");

const allBody = [
  ...titlePage,
  new Paragraph({ children: [new PageBreak()] }),
  ...abstract,
  ...toc,
  ...chapterOne,
  ...chapterTwo,
  ...chapterThree,
  ...chapterFour,
  ...chapterFive,
  ...references,
];

const doc = new Document({
  creator: "AI Course Project Group",
  title: "Machine Learning-Based Student Academic Performance Prediction: A Case Study of the University of Ibadan",
  styles: {
    default: {
      document: { run: { font: FONT, size: 24, color: "000000" } },
    },
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      },
      ...["objectives", "questions", "func-req", "contributions", "recommendations", "num-list"].map(ref => ({
        reference: ref,
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      })),
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "ML-Based Student Academic Performance Prediction: University of Ibadan", size: 18, font: FONT, color: "000000" })],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ children: [PageNumber.CURRENT], size: 20, font: FONT })],
          })],
        }),
      },
      children: allBody,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("../outputs/ML_Student_Performance_Prediction_UI_Term_Paper.docx", buffer);
  console.log("Document written successfully.");
});
