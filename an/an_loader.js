(function () {

    function generateOWID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getOrCreateOwid() {
        // Check if a existingOWID is already stored 
        let existingOWID = localStorage.getItem('owid');

        // If there's no existing existingOWID, generate a new one
        if (!existingOWID) {
            existingOWID = generateOWID();
            localStorage.setItem('owid', existingOWID);
        }

        return existingOWID;
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    console.log('%cAll 4 corners are in view for 1 second - FIRE AN IMPRESSION HERE', 'background: #4CAF50; color: white; padding: 8px; border-radius: 4px;');
                }, 1000);
            }
        });
    }

    function init() {
        let targetDiv = document.getElementById("owan_loader");

        if (targetDiv) {
            
            const owid = getOrCreateOwid(); console.log(owid);
            
            let publisher = targetDiv.getAttribute("data-pub");
            let stripe = targetDiv.getAttribute("data-stripe");
            let owidStub = stripe + "_" + owid;
            let currentTimestamp = new Date().getTime();
            let divElement = document.createElement("div");

            divElement.className = "pi_" + stripe + " jeeng";
            divElement.innerHTML = `
                <table width="300" align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 300px;">
                    <tr>
                        <td align="center">
                            <a href="https://rs-stripe.${publisher}/stripe/redirect?cs_email=${owidStub}&cs_stripeid=${stripe}&cs_sendid=${currentTimestamp}&cs_offset=0&cs_esp=ipost" style="border-style: none; outline: none; text-decoration: none;" target="_blank" rel="nofollow noopener">
                                <img alt="" height="auto" src="https://rs-stripe.${publisher}/stripe/image?cs_email=${owidStub}&cs_stripeid=${stripe}&cs_sendid=${currentTimestamp}&cs_offset=0&cs_esp=ipost" style="display: block; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; width: 100%; max-width: 300px;" width="300">
                            </a>
                        </td>
                    </tr>
                </table>
            `;

            targetDiv.appendChild(divElement);

            const observer = new IntersectionObserver(handleIntersection, {
                threshold: 1,
            });

            const dynamicElement = targetDiv.querySelector('.pi_' + stripe + '.jeeng');
            observer.observe(dynamicElement);

           
        } else {
            console.error('Target div not found. Make sure to set the appropriate IDs.');
        }
    }

    init();
})();
