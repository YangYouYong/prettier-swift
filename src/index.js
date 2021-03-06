"use strict";

const util = require("prettier/src/common/util");
const { parse, preprocess } = require("./parser");
const print = require("./printer");

const languages = [
  {
    name: "Swift",
    parsers: ["swift"],
    extensions: [".swift"],
    tmScope: "source.swift",
    aceMode: "text",
    linguistLanguageId: 362,
    vscodeLanguageIds: ["swift"]
  }
];

const parsers = {
  swift: {
    parse,
    preprocess,
    astFormat: "swift"
  }
};

function canAttachComment(node) {
  if (node.token) {
    return false;
  } else if (["StmtList", "DeclList"].includes(node.type)) {
    return !node.layout.length;
  } else if (node.type.endsWith("List")) {
    return false;
  }

  return !["TopLevelCodeDecl", "IfConfigDecl", "FunctionCallArgument"].includes(
    node.type
  );
}

function printComment(commentPath) {
  const comment = commentPath.getValue();

  switch (comment.type) {
    case "CommentBlock":
    case "CommentLine":
      return comment.value.trimRight();
    default:
      throw new Error("Not a comment: " + JSON.stringify(comment));
  }
}

const printers = {
  swift: {
    print,
    hasPrettierIgnore: util.hasIgnoreComment,
    canAttachComment,
    printComment,
    getCommentChildNodes,
    willPrintOwnComments
  }
};

function willPrintOwnComments() {
  return true;
}

function getCommentChildNodes(node) {
  return node.layout;
}

module.exports = {
  languages,
  printers,
  parsers
};
