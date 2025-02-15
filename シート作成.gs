//スプレッドシート
const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//シート
const sourceSheet = spreadsheet.getSheetByName("スケ一覧"); //手動入力
const flameSheet = spreadsheet.getSheetByName("用紙FM");   //手動入力
//行・列
const lastRow = sourceSheet.getLastRow();
const lastColumn = sourceSheet.getLastColumn();
const checkCol = 1                                         //手動入力
const sheetNameCol = 2                                     //手動入力
//セル
const colDst = sourceSheet.getRange(1,1,1,lastColumn).getValues().flat();

function copyDataToNewSheets() {
  console.log(colDst);
  for (var i = 2; i <= lastRow; i++) {
    // 最初の列の値をチェックしてコピー済みかどうかを確認
    var isCopied = sourceSheet.getRange(i, checkCol).getValue() == "PDF化済み";
    console.log(i);
    if (!isCopied) {
      //新しいシートを用紙FMを基に作成→データを転記
      var newSheet = flameSheet.copyTo(spreadsheet);
      var rowData = sourceSheet.getRange(i, 1, 1, lastColumn).getValues().flat();

      for(j = 1; j <= rowData.length; j++){
        console.log(j);
        //console.log(rowData);
        newSheet.setName(rowData[sheetNameCol-1].toString());
        if(colDst[j]){
          newSheet.getRange(colDst[j]).setValue(rowData[j]);
        }
      }
    }
  }
}
