let targetDiv = document.getElementById("owan_loader");

if (targetDiv) {
    
    // Extract the pub and stripe id attribute value
    let publisher = targetDiv.getAttribute("data-pub");
    let stripe = targetDiv.getAttribute("data-stripe");
    let spot = targetDiv.getAttribute("data-spot");

    //No User email lets concat stripe and new placement spot for optimization by this
    let email_stub = stripe + "_" + spot + "@an.openweb.com"

    //Set sendid to be the impressiontimestamp - get new ads every impression I think
    let currentTimestamp = new Date().getTime();
    
    let divElement = document.createElement("div");
  
    // Set the class attribute for the div
    divElement.className = "pi_" + stripe + " jeeng";

    // Set the HTML content for the div
    divElement.innerHTML = `
    <!-- domain: rs-stripe.`+ publisher +` -->
    <!--[if (gte mso 9)|(IE)]><table align="center" cellpadding="0" cellspacing=0 width="300"><tr><td><![endif]-->
    <table width="300" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 300px;">
        <tr>
        <td align="center">
            <a href="https://rs-stripe.`+ publisher +`/stripe/redirect?cs_email=`+ email_stub +`&cs_stripeid=`+ stripe +`&cs_sendid=`+ currentTimestamp +`&cs_offset=0&cs_esp=ipost" style="border-style: none; outline: none; text-decoration: none;" target="_blank" rel="nofollow noopener">
            <img alt="" height="auto" src="https://rs-stripe.`+ publisher +`/stripe/image?cs_email=`+ email_stub +`&cs_stripeid=`+ stripe +`&cs_sendid=`+ currentTimestamp +`&cs_offset=0&cs_esp=ipost" style="display: block; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; width: 100%; max-width: 300px;" width="300">
            </a>
        </td>
        </tr>
    </table>
    <table width="600" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 300px;">
        <tbody>
        <tr>
            <td align="center" height="3" valign="top" style="font-size: 3px; height: 3px; line-height: 3px; vertical-align: top;">
            &nbsp;
            </td>
        </tr>
        <!--<tr>
            <td align="right">
            <a href="https://rs-stripe.fitleanhealth.com/branding/?utm_source=contentstripe&utm_campaign=rs_`+ stripe +`&utm_medium=applenews&utm_content=logo" style="display: block;border: 0;outline: none;text-decoration: none;color: #000;font-size: 11px;width: 165px;" target="_blank" rel="nofollow noopener">
                Ads by OpenWeb
            </a>
            </td>
        </tr>-->
        </tbody>
    </table>
    <!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->
    `;

    targetDiv.appendChild(divElement);


    // Function to be called when the element is in view
    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The element is in view
                //console.log('Element is just in view!');
                setTimeout(() => {
                    console.log('%cAll 4 corners are in view for 1 second - FIRE AN IMPRESSION HERE', 'background: #4CAF50; color: white; padding: 8px; border-radius: 4px;'); 
                }, 1000);
            }
        });
    }

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 1, // 1 means the entire element must be in view
    });

    // Get the dynamically created element to observe
    const dynamicElement = targetDiv.querySelector('.pi_' + stripe + '.jeeng');

    // Start observing the dynamically created element
    observer.observe(dynamicElement);

} else {
  console.error('Target div not found. Make sure to set the appropriate IDs.');
}
