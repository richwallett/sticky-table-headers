!function(){var e=function(){for(var e=document.getElementsByTagName("script"),t=0;t<e.length;t++){var n=e[t].src;if(n.match(/tender_widget\.js(\?.*)?$/))var o="https://federalregister.tenderapp.com/"}return o},t=new RegExp("/documents/\\d{4}"),n=function(){return t.test(window.location.href)},o=function(){var e=$("#interstitial-tender-modal-template");if(e.length>0){e=Handlebars.compile(e.html());var t,n="",o=$(".button.formal_comment");o.length>0&&"#addresses"!=o.first().attr("href")?t="If you would like to submit a formal comment to the issuing agency on the document you are currently viewing, please use the 'Document Feedback' button below.":$("#addresses").length>0||$("#further-info").length>0?t="If you would like to comment on the current document, please use the 'Document Comment' button below for instructions on contacting the issuing agency":(t="The current document is not open for formal comment, please use other means to contact "+$(".metadata .agencies").html()+" directly.",n="disabled"),FR2.Modal.displayModal("",e({document_feedback_text:t,document_button_enabled:n}),{modalId:"#interstitial_tender_modal",includeTitle:!1,modalClass:"fr_modal wide"}),$("#interstitial_tender_modal").on("click",".site_feedback .button",function(e){e.preventDefault(),$("#interstitial_tender_modal").remove(),l()}),$("#interstitial_tender_modal").on("click",".document_feedback .button:not(.disabled)",function(e){e.preventDefault(),$("#interstitial_tender_modal").jqmHide();var t=$(".button.formal_comment");t.length>0&&"#addresses"!=t.first().attr("href")?window.open(t.attr("href"),"_blank"):window.location.href=$("#addresses").length>0?"#addresses":"#further-info"})}else l()},d=!1,r=!1,i=e();i&&""!==i||(i="https://federalregister.tenderapp.com/");var a=function(){n()?o():l()},l=function(){r?(document.getElementById("tender_window").style.display="",d=!0):c()},s=function(){document.getElementById("tender_window").style.display="none","undefined"!=typeof Tender&&Tender.hideToggle||(document.getElementById("tender_toggler").style.display=""),d=!1},c=function(){var e=document.createElement("div"),t=i+"widget/discussion/new?r="+Math.random()+"&discussion[body]="+encodeURIComponent("\n\n\n\n\n-----------------\nURL: "+window.location+"\nBROWSER: "+navigator.userAgent);"undefined"!=typeof Tender&&Tender.sso&&(t+="&sso="+encodeURIComponent(Tender.sso)),"undefined"!=typeof Tender&&Tender.widgetEmail&&(t+="&email="+encodeURIComponent(Tender.widgetEmail));var n='<div id="tender_window"><a href="#" id="tender_closer">Close</a><div id="tender_frame"><iframe src="'+t+'" scrolling="no" frameborder="0" width="100%" height="100%"></iframe></div></div>';e.innerHTML=n;e.getElementsByTagName("iframe")[0];document.body.appendChild(e);var o=document.getElementById("tender_closer");o.onclick=function(){return $(".jqmOverlay").remove(),s(),!1},r=!0,l()};if("undefined"!=typeof Tender&&Tender.widgetToggles)for(var m=0;m<Tender.widgetToggles.length;m++){var u=Tender.widgetToggles[m];null!=u&&(u.onclick=function(){return a(),!1})}var g="#tender_window{ position:absolute; top:20px; left:50%; margin-left:-340px; width:680px; height:615px; padding:3px; background:url("+i+"images/widget/overlay_back.png); z-index:9999; }";g+="#tender_window iframe{ border:none; width:100%; height:100%; } ",g+="#tender_window #tender_frame{ width:100%; height:100%; background:url("+i+"images/widget/loader.gif) 50% 50% no-repeat #fff; } ",g+="#tender_closer{ position:absolute; top:18px; right:18px; color:#fff; font-family:Helvetica, Arial, sans-serif; font-size:12px; font-weight:bold; text-decoration:none; border:none; } ",g+="#tender_toggler{ position:absolute; top:100px; right:0px; width:33px; height:105px; padding:3px 0 3px 3px; background:url("+i+"images/widget/overlay_back.png); } ",g+="#tender_toggler_link{ display:block; width:100%; height:100%; text-decoration:none; border:none; background:#006699; text-indent:-9999px; background:url("+i+"images/widget/tab_text.gif); } ";var f=document.createElement("style");f.setAttribute("type","text/css"),f.setAttribute("charset","utf-8");try{f.appendChild(document.createTextNode(g)),document.getElementsByTagName("head").item(0).appendChild(f)}catch(p){}document.createStyleSheet&&document.createStyleSheet(i+"tender_widget_styles.css")}();