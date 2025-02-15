function convertPdf() {
  const scrProp = PropertiesService.getScriptProperties();
  let ss = spreadsheet;
  let folderId = scrProp.getProperty('folder_ID');
  
  let folder = DriveApp.getFolderById(folderId);
  for (var i = 2; i <= lastRow; i++) {
    // 最初の列の値をチェックしてコピー済みかどうかを確認
    var isCopied = sourceSheet.getRange(i, checkCol);
    
    if (isCopied.getValue() != "PDF化済み") {
      
      //アクティブシートのIDとGIDを取得する
      var pdfName = sourceSheet.getRange(i, sheetNameCol).getValue().toString();
      var sheet = ss.getSheetByName(pdfName);
      var sheetID = sheet.getSheetId();
      var key = ss.getId();
      
      var token = ScriptApp.getOAuthToken();

      //URLの組み立て
      var url = "https://docs.google.com/spreadsheets/d/" + key + "/export?gid=" + sheetID + "&format=pdf&portrait=false&size=A4&gridlines=false&fitw=true"
    
      //PDF生成するURLをfetchする
      var pdf = UrlFetchApp.fetch(url, {headers: {'Authorization': 'Bearer ' +  token}}).getBlob().setName("test" + ".pdf");

      /*
      
      //コンテナバインドで紐付いたスプレッドシートでPDF化したいシートを取得
      var sheet = ss.getSheetByName(pdfName);
      //スプレッドシートの個別シートをPDF化するために新規のスプレッドシートを作成
      var newSs = SpreadsheetApp.create(pdfName);
      //PDF化したい個別シートを新規作成したスプレッドシートにコピー
      sheet.copyTo(newSs);
      var newSheetId = newSs.getActiveSheet().getSheetId();
      //スプレッドシート新規作成でデフォルト作成されるシートを削除
      newSs.deleteSheet(newSs.getSheets()[0]);
      */

      
      //PDFとしてgetAsメソッドでblob形式で取得
      //var pdf = newSs.getAs('application/pdf');
      //pdfファイルの名前を設定
      pdf.setName(pdfName);
      //GoogleドライブにPDFに変換したデータを保存
      folder.createFile(pdf); 
      

      //var newSsId = newSs.getId();
      
      //createPdf(folderId, newSsId, newSheetId, pdfName);

      //DriveApp.getFileById(newSsId).setTrashed(true);
      Logger.log('PDFファイルのURL (' + pdfName + '): ' + folder.getUrl() + '/' + pdf.getName());
      isCopied.setValue("PDF化済み");
      //Utilities.sleep(20000);
    }
  }
}

