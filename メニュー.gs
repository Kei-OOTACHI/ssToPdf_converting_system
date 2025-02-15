function onOpen() {
  let ui = SpreadsheetApp.getUi()
  
  //メニュー名を決定
  let menu = ui.createMenu("GAS実行");
  
  //メニューに実行ボタン名と関数を割り当て
  menu.addItem("スケ一覧→許可証ごと個別シート","copyDataToNewSheets");
  menu.addItem("個別シート→PDF","convertPdf");
  menu.addItem("PDF保存フォルダ変更","chgSendSpace");
  //スプレッドシートに反映
  menu.addToUi();
}

/**
 * 入力欄のあるダイアログボックスを表示する関数
 * @parm {string} message - promptの文言
 * @return {string} 入力欄に入力した文字列
 */
function showInputDialog(message) {
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(message, ui.ButtonSet.OK_CANCEL);

  if (result.getSelectedButton() === ui.Button.OK) {
    var imputValue = result.getResponseText();
    return imputValue;
  }
}

function chgSendSpace(){
  const scrProp = PropertiesService.getScriptProperties();
  let ui = SpreadsheetApp.getUi();
  const folderId = showInputDialog('保存先フォルダのID（URLの「folders/」より後の部分）を入力:');
  if (folderId) {
    scrProp.setProperty('folder_ID',folderId);
    ui.alert('完成したPDFは「' + DriveApp.getFileById(folderId).getName() + '」に保存されます');
  } else {
    ui.alert('No value provided. Value not saved.');
  }
}