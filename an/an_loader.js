let targetDiv = document.getElementById("owan_loader");

if (targetDiv) {
    
    // Extract the pub and stripe id attribute value
    let publisher = targetDiv.getAttribute("data-pub");
    let stripe = targetDiv.getAttribute("data-stripe");
    let spot = targetDiv.getAttribute("data-spot");

    //No User email lets concat stripe and new placement spot for optimization
    let email_stub = stripe + "_" + spot + "@an.openweb.com"

    var currentTimestamp = new Date().getTime();
    
    let divElement = document.createElement("div");
  
    // Set the class attribute for the div
    divElement.className = "pi_" + stripe + " jeeng";

    // Set the HTML content for the div
    divElement.innerHTML = `
    <!-- domain: rs-stripe.`+ publisher +` -->
    <!--[if (gte mso 9)|(IE)]><table align="center" cellpadding="0" cellspacing=0 width="600"><tr><td><![endif]-->
    <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px;">
        <tr>
        <td align="center">
            <a href="https://rs-stripe.`+ publisher +`.com/stripe/redirect?cs_email=`+ email_stub +`&cs_stripeid=`+ stripe +`&cs_sendid=`+ currentTimestamp +`&cs_offset=0&cs_esp=ipost" style="border-style: none; outline: none; text-decoration: none;" target="_blank" rel="nofollow noopener">
            <img alt="" height="auto" src="https://rs-stripe.`+ publisher +`.com/stripe/image?cs_email=`+ email_stub +`&cs_stripeid=`+ stripe +`&cs_sendid=`+ currentTimestamp +`&cs_offset=0&cs_esp=ipost" style="display: block; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; width: 100%; max-width: 600px;" width="600">
            </a>
        </td>
        </tr>
    </table>
    <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px;">
        <tbody>
        <tr>
            <td align="center" height="3" valign="top" style="font-size: 3px; height: 3px; line-height: 3px; vertical-align: top;">
            &nbsp;
            </td>
        </tr>
        <tr>
            <td align="right">
            <a href="https://rs-stripe.fitleanhealth.com/branding/?utm_source=contentstripe&utm_campaign=rs_`+ stripe +`&utm_medium=applenews&utm_content=logo" style="display: inline-block; border: 0; outline: none; text-decoration: none;" target="_blank" rel="nofollow noopener">
                <img src="https://rs-stripe.fitleanhealth.com/branding/recommend/powerinbox-rec-reg.png" width="154" height="15" border="0" alt="Learn more about Jeeng">
            </a>
            </td>
        </tr>
        </tbody>
    </table>
    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
    `;

  targetDiv.appendChild(divElement);
} else {
  console.error('Target div not found. Make sure to set the appropriate ID.');
}
