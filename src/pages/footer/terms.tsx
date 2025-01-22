import BoldText from "@/components/utils/boldText";
import { staticText } from "@/helper/staticText";

const Terms = () => {
  return (
    <div className="py-6">
      <table className="w-full border-0 table-fixed">
        <tr>
          <td
            id="terms"
            className="bg-[#ededed] rounded font-sans text-left p-4 sm:p-8 w-full text-gray-800 align-top leading-[21px] text-sm sm:text-base"
          >
            <span className="font-bold text-lg">Terms and Conditions</span>
            <p className="mt-4">
              <BoldText
                text={staticText.readTerms}
                highlights={["Beyondo Global Foundation"]}
              />
            </p>

            <b className="block mt-4">General Conditions for Fundraisers:</b>
            <ul className="list-disc list-inside mt-2">
              <div className="pl-2 sm:pl-4 space-y-2">
                <li>{staticText.termsText1}</li>
                <li>{staticText.termsText2}</li>
                <li>{staticText.termsText3}</li>
                <li>{staticText.termsText4}</li>
                <li>{staticText.termsText5}</li>
                <li>{staticText.termsText6}</li>
                <li>{staticText.termsText7}</li>
                <li>{staticText.termsText8}</li>
                <li>{staticText.termsText9}</li>
                <li>{staticText.termsText10}</li>
                <li>{staticText.termsText11}</li>
                <li>{staticText.termsText12}</li>
                <li>{staticText.termsText13}</li>
                <li>{staticText.termsText14}</li>
              </div>
              <b className="block mt-4">Fund transfer and management :</b>
              <p>{staticText.management}</p>
              <b className="block mt-4">Taxation :</b>
              <p>{staticText.taxation}</p>
              <b className="block mt-4">Project completion :</b>
              <p>{staticText.project}</p>
              <b className="block mt-4">Campaign cancellation :</b>
              <p>{staticText.cancellation}</p>
              <b className="block mt-4">DoKarma’s rights :</b>
              <p>{staticText.rights}</p>
              <b className="block mt-4">Third-Party Sites :</b>
              <p>{staticText.thirdparty}</p>
              <b className="block mt-4">General Terms For Donors :</b>
              <ul className="list-disc list-inside pl-2 sm:pl-4 mt-2 space-y-2">
                <li>{staticText.donors.text1}</li>
                <li>{staticText.donors.text2}</li>
                <li>{staticText.donors.text3}</li>
                <li>{staticText.donors.text4}</li>
                <li>{staticText.donors.text5}</li>
                <li>{staticText.donors.text6}</li>
                <li>{staticText.donors.text7}</li>
                <li>{staticText.donors.text8}</li>
              </ul>
              <b className="block mt-4">Payment details :</b>
              <ul className="list-disc list-inside pl-2 sm:pl-4 mt-2 space-y-2">
                <li>{staticText.paymentDetails1}</li>
                <li>{staticText.paymentDetails2}</li>
              </ul>
              <b className="block mt-4">Fees and taxes :</b>
              <p>{staticText.feeTaxes}</p>
              <b className="block mt-4">Other contributor information :</b>
              <ul className="list-disc list-inside pl-2 sm:pl-4 mt-2 space-y-2">
                <li>{staticText.contribute1}</li>
                <li>{staticText.contribute2}</li>
              </ul>
              <b className="block mt-4">Refund & Cancellation :</b>
              <p>{staticText.refund}</p>
              <b className="block mt-4">Rights of the project :</b>
              <p>{staticText.rights1}</p>
              <b className="block mt-4">
                Dispute between campaigners and their contributors :
              </b>
              <p>{staticText.campaigners}</p>
              <b className="block mt-4">Rules and Conduct :</b>
              <p>{staticText.rules.title}</p>
              <ul className="list-disc list-inside pl-2 sm:pl-4 mt-2 space-y-2">
                <li>{staticText.rules.text1}</li>
                <li>{staticText.rules.text2}</li>
                <li>{staticText.rules.text3}</li>
                <li>{staticText.rules.text4}</li>
                <li>{staticText.rules.text5}</li>
                <li>{staticText.rules.text6}</li>
                <li>{staticText.rules.text7}</li>
                <li>{staticText.rules.text8}</li>
              </ul>
              <b className="block mt-4">Termination :</b>
              <p>{staticText.termination}</p>
              <b className="block mt-4">Indemnification :</b>
              <p>{staticText.indemnification}</p>
              <b className="block mt-4">Limitation of Liabilty :</b>
              <p>{staticText.liability}</p>
              <b className="block mt-4">
                Electronic Delivery, Notice Policy, and Your Consent :
              </b>
              <p>{staticText.delivery}</p>
              <b className="block mt-4">Governing Law :</b>
              <p>{staticText.law}</p>
              <b className="block mt-4">Integration and Severability :</b>
              <p>{staticText.integration}</p>
              <b className="block mt-4">Miscellaneous :</b>
              <p>{staticText.miscellaneous}</p>

              {/* <li>1.3 You represent that you are 14 years or older...</li>
              <li>
                1.4 You represent that you are accessing our service as a
                private person. Any commercial use of our service is not
                allowed.
              </li> */}
            </ul>

            {/* <b className="block mt-4">
              2. Fundraising Page Duration and Hosting Policy:
            </b> */}
            {/* <ul className="list-disc list-inside pl-4 mt-2 space-y-2"> */}
            {/* <li>
                2.4 We continuously strive to improve our products / services...
              </li>
              <li>2.5 Beebox may automatically update products...</li>
              <li>
                2.6 Maintenance may affect availability of our products...
              </li> */}
            {/* </ul> */}

            {/* <b className="block mt-4">
              3. Disclaimer on Contribution Amount Responsibility:
            </b>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
              
            </ul>

            <b className="block mt-4">
              4. Fund Transfer and Contributor Details Policy:
            </b>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
              
            </ul>

            <b className="block mt-4">
              5. Agreement on Fund Ownership and Disbursement Timeline:
            </b> */}
            {/* <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
              
            </ul>

            <b className="block mt-4">
              6. Fund Disbursement for Indian Contributions:
            </b>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
              
            </ul> */}

            {/* <b className="block mt-4">
              7. Fund Disbursement for US Contributions:
            </b>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
              
            </ul>
            <b className="block mt-4">
              8. Foreign Contributions Compliance and Fee Deductions Policy:
            </b>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
            </ul> */}
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Terms;
