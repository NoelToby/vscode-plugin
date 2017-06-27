'use strict';
const md5 = require('md5');
const {head} = require('./utils');
const {StateController} = require('kite-installer');

function languagesPath() {
  return '/clientapi/languages';
}

function tokensPath(editor) {
  const state = md5(editor.getText());
  const filename = editor.getPath();
  const buffer = cleanPath(filename);
  return [
    `/api/buffer/vscode/${buffer}/${state}/tokens`,
  ].join('?');
}

function accountPath() {
  return [
    '/api/account/user',
  ].join('?');
}

function statusPath(path) {
  return [
    '/clientapi/status',
    [
      `filename=${encodeURI(path)}`,
    ].join('&'),
  ].join('?');
}

function signaturePath() {
  return [
    '/clientapi/editor/signatures',
  ].join('?');
}

function searchPath(query, offset = 0, limit = 10) {
  return [
    '/api/editor/search',
    [
      `q=${encodeURI(query)}`,
      `offset=${offset}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function projectDirPath(path) {
  return [
    '/clientapi/projectdir',
    [
      `filename=${encodeURI(path)}`,
    ].join('&'),
  ].join('?');
}

function shouldNotifyPath(path) {
  return [
    '/clientapi/permissions/notify',
    [
      `filename=${encodeURI(path)}`,
    ].join('&'),
  ].join('?');
}

function completionsPath() {
  return [
    '/clientapi/editor/completions',
  ].join('?');
}

function reportPath(data) {
  const value = head(head(data.symbol).value);

  return valueReportPath(value.id);
}

function valueReportPath(id) {
  return [
    `/api/editor/value/${id}`,
  ].join('?');
}

function membersPath(id, page = 0, limit = 999) {
  return [
    `/api/editor/value/${id}/members`,
    [
      `offset=${page}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function usagesPath(id, page = 0, limit = 999) {
  return [
    `/api/editor/value/${id}/usages`,
    [
      `offset=${page}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function usagePath(id) {
  return [
    `/api/editor/usages/${id}`,
  ].join('?');
}

function examplePath(id) {
  return [
    `/api/python/curation/${id}`,
  ].join('?');
}
function appendToken(url) {
  return url;
  // const token = StateController.client.LOCAL_TOKEN;
  // return url.indexOf('?') !== -1
  //   ? `${url}&localtoken=${token}`
  //   : `${url}?localtoken=${token}`;
}
function openDocumentationInWebURL(id, token = false) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/docs/python/${escapeId(id)}`;
  return token ? appendToken(url) : url;
}

function openSignatureInWebURL(id, token = false) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/docs/python/${escapeId(id)}%23signature`;
  return token ? appendToken(url) : url;
}

function openExampleInWebURL(id, token = false) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/examples/python/${escapeId(id)}`;
  return token ? appendToken(url) : url;
}

function hoverPath(document, range) {
  const state = md5(document.getText());
  const filename = document.fileName;
  const buffer = cleanPath(filename);
  const start = document.offsetAt(range.start);
  const end = document.offsetAt(range.end);
  return [
    `/api/buffer/vscode/${buffer}/${state}/hover`,
    [
      `selection_begin_bytes=${start}`,
      `selection_end_bytes=${end}`,
    ].join('&'),
  ].join('?');
}

function escapeId(id) {
  return encodeURI(String(id)).replace(/;/g, '%3B');
}

function cleanPath(p) {
  return encodeURI(p)
  .replace(/^([a-zA-Z]):/, '/windows/$1')
  .replace(/\/|\\|%5C/g, ':');
}

function serializeRangeForPath(range) {
  return `${range.start.row}:${range.start.column}/${range.end.row}:${range.end.column}`;
}

module.exports = {
  accountPath,
  appendToken,
  completionsPath,
  examplePath,
  hoverPath,
  membersPath,
  openDocumentationInWebURL,
  openExampleInWebURL,
  openSignatureInWebURL,
  projectDirPath,
  languagesPath,
  reportPath,
  searchPath,
  serializeRangeForPath,
  shouldNotifyPath,
  signaturePath,
  tokensPath,
  usagePath,
  usagesPath,
  statusPath,
  valueReportPath,
};
