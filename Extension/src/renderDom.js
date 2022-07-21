// Rendering All Added content in tag
function renderTag(tagTypeContent, tagType) {
  $(tagType).each(function () {
    let existingElement = $(this);
    for (let x in tagTypeContent) {
      if (tagTypeContent[x].oldContent == existingElement.text()) {
        existingElement.text(tagTypeContent[x].newContent);
        break;
      }
    }
  });
} // End function renderPTag () {

// Here, we are going to fetch all the new added contents
async function getNewContents() {
  let currentUrl = window.location.href;
  let { data } = await getParameter(["userDetails"]);
  let userEmail = data.userDetails ? data.userDetails.email : "NA";
  if (userEmail == "NA") {
    // when user not logged in
    return {};
  }

  let payload = {
    currentUrl,
    userEmail,
  };
  let fetchStatus = await handleRequest(getContentUrl, payload);
  if (fetchStatus.code != 2) {
    // when some error occur
    return;
  }
  let contentTypes = {};
  let pTagTypeContent = fetchStatus.payload.pTagTypeContent
    ? fetchStatus.payload.pTagTypeContent
    : [];
  if (pTagTypeContent.length > 0) {
    contentTypes = { ...contentTypes, pTagTypeContent };
  }

  let h1TagTypeContent = fetchStatus.payload.h1TagTypeContent
    ? fetchStatus.payload.h1TagTypeContent
    : [];
  if (h1TagTypeContent.length > 0) {
    contentTypes = { ...contentTypes, h1TagTypeContent };
  }

  let h3TagTypeContent = fetchStatus.payload.h3TagTypeContent
    ? fetchStatus.payload.h3TagTypeContent
    : [];
  if (h3TagTypeContent.length > 0) {
    contentTypes = { ...contentTypes, h3TagTypeContent };
  }

  let spanTagTypeContent = fetchStatus.payload.spanTagTypeContent
    ? fetchStatus.payload.spanTagTypeContent
    : [];
  if (spanTagTypeContent.length > 0) {
    contentTypes = { ...contentTypes, spanTagTypeContent };
  }

  let liTagTypeContent = fetchStatus.payload.liTagTypeContent
    ? fetchStatus.payload.liTagTypeContent
    : [];
  if (liTagTypeContent.length > 0) {
    contentTypes = { ...contentTypes, liTagTypeContent };
  }

  return contentTypes;
} // End function replaceOldContent () {

// Render Dom with Added Text
async function renderAddedContentInDom() {
  let contentTypes = await getNewContents();
  let pTagTypeContent = contentTypes.pTagTypeContent
    ? contentTypes.pTagTypeContent
    : [];
  if (pTagTypeContent.length > 0) {
    renderTag(pTagTypeContent, "p");
  }

  let h1TagTypeContent = contentTypes.h1TagTypeContent
    ? contentTypes.h1TagTypeContent
    : [];
  if (h1TagTypeContent.length > 0) {
    renderTag(h1TagTypeContent, "h1");
  }

  let h3TagTypeContent = contentTypes.h3TagTypeContent
    ? contentTypes.h3TagTypeContent
    : [];
  if (h3TagTypeContent.length > 0) {
    renderTag(h3TagTypeContent, "h3");
  }

  let spanTagTypeContent = contentTypes.spanTagTypeContent
    ? contentTypes.spanTagTypeContent
    : [];
  if (spanTagTypeContent.length > 0) {
    renderTag(spanTagTypeContent, "span");
  }
  
  let liTagTypeContent = contentTypes.liTagTypeContent
    ? contentTypes.liTagTypeContent
    : [];
  if (liTagTypeContent.length > 0) {
    renderTag(liTagTypeContent, "li");
  }
} // End async function renderAddedContentInDom () {
