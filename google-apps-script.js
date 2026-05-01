// ============================================================
// Google Apps Script - Paste this into script.google.com
// Your Spreadsheet ID: 1Nt6qVOpdueQ5iqewjOo6ZtJnywAXPQs4l7D709TBMao
// ============================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Validation
    if (!data.timestamp || !data.browser || !data.device) {
      return ContentService.createTextOutput(
        JSON.stringify({ status: "error", message: "Missing fields" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Open YOUR specific spreadsheet
    var ss = SpreadsheetApp.openById("1x8L7h8zBHSqCRN5MJemPh3qkgo7nlhqgVueknAMiFmE");
    var sheet = ss.getActiveSheet();

    // Append visitor data row
    sheet.appendRow([
      data.timestamp,
      data.latitude,
      data.longitude,
      data.mapLink,
      data.ip,
      data.browser,
      data.device,
      data.status
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "active", message: "Visitor tracker running" })
  ).setMimeType(ContentService.MimeType.JSON);
}
