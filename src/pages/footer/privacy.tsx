import BoldText from "@/components/utils/boldText";
import { staticText } from "@/helper/staticText";

const Privacy = () => {
  return (
    <div className="py-6">
      <table className="w-full table-fixed border-collapse">
        <tbody>
          <tr>
            <td
              id="Privacy"
              valign="top"
              className="bg-[#ededed] rounded font-sans text-left p-4 sm:p-8 text-gray-800 align-top leading-[21px] text-sm sm:text-base mobile-text-3"
            >
              <span className="font-bold text-lg">Privacy Policy</span>
              <br />
              <br />
              <p className="mt-2">
                <BoldText
                  text={staticText.privacy.text1}
                  highlights={["Beyondo Global Foundation"]}
                />
              </p>
              <br />
              <p className="mt-2">{staticText.privacy.text2}</p>
              <br />
              <p className="mt-2">{staticText.privacy.text3}</p>
              <br />
              <b className="block mt-4">1. Personal Information</b>
              <p className="mt-2">{staticText.privacy.info1}</p>
              <br />
              <p className="mt-2">{staticText.privacy.info2}</p>
              <br />
              <p className="mt-2">{staticText.privacy.info3}</p>
              <br />
              <ul className="list-disc list-inside pl-4 mt-2 space-y-2">
                <li>
                  <b>Contact Information:</b> {staticText.privacy.contactInfo}
                </li>
                <li>
                  <b>Personalized Information: </b>
                  {staticText.privacy.personalInfo}
                </li>
                <li>
                  <b>Transaction and Technical Information: </b>
                  {staticText.privacy.transaction}
                </li>
                <li>
                  <b>Third-Party Data: </b>
                  {staticText.privacy.thirdParty}
                </li>
                <li>
                  <b>Financial Data: </b>
                  {staticText.privacy.financial}
                </li>
                <li>
                  <b>Other Data: </b>
                  {staticText.privacy.otherData}
                </li>
              </ul>
              <br />
              <p className="mt-2">{staticText.privacy.text4}</p>
              <p className="mt-2">{staticText.privacy.text5}</p>
              <p className="mt-2">{staticText.privacy.text6}</p>
              <p className="mt-2">{staticText.privacy.text7}</p>
              <br />
              <b className="block mt-4">2. Authorized Third Party Activities</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.authorized1}</p>
                <p>{staticText.privacy.authorized2}</p>
                <p>{staticText.privacy.authorized3}</p>
                <p>{staticText.privacy.authorized4}</p>
                <p>{staticText.privacy.authorized5}</p>
                <p>{staticText.privacy.authorized6}</p>
                <p>{staticText.privacy.authorized7}</p>
                <p>{staticText.privacy.authorized8}</p>
              </div>
              <b className="block mt-4">3. Links to Third-Party Websites</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.links1}</p>
                <p>{staticText.privacy.links2}</p>
              </div>
              <b className="block mt-4">4. Cookies</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.cookies1}</p>
                <p>{staticText.privacy.cookies2}</p>
                <p>{staticText.privacy.cookies3}</p>
              </div>
              <b className="block mt-4">5. Data Retention</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.retention1}</p>
                <p>{staticText.privacy.retention2}</p>
                <p>{staticText.privacy.retention3}</p>
              </div>
              <b className="block mt-4">6. Right to unsubscribe</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.unsubscribe1}</p>
                <p>{staticText.privacy.unsubscribe2}</p>
                <p>{staticText.privacy.unsubscribe3}</p>
              </div>
              <b className="block mt-4">7. Persons allowed to Use DoKarma</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.allow}</p>
              </div>
              <b className="block mt-4">8. Grievances</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.grievances}</p>
                <p>Please find below the details of the grievance officer: </p>
                <p>Name: [Praveen]</p>
                <p>Email: [pk@dokarma.in]</p>
                <p>Address: [No.84 Sannathi Street, Tiruvannamalai - 606601]</p>
              </div>
              <b className="block mt-4">9. Changes to This Privacy Policy</b>
              <br />
              <div className="flex flex-col gap-4">
                <p>{staticText.privacy.changePolicy}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Privacy;
