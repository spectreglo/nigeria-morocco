import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { t } from "i18next";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, cities = [] } = (location.state || {}) as {
    total?: number;
    cities?: string[];
  };
  const fromBooking = location.state?.fromBooking || false;

  return (
    <div className="w-full h-auto min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-xl rounded-2xl my-4 p-8 w-full max-w-lg flex flex-col justify-center items-center animate-fade-in">
        <img
          src="/gif.gif"
          className="h-[70px] w-[70px] mb-2 animate-bounce"
          alt="Success"
        />
        <h1 className="my-4 text-2xl font-bold text-green-600">
          {t("Successful")}
        </h1>

        {!fromBooking && (
          <div className="w-full mb-6">
            <h2 className="text-md font-semibold mb-2 text-gray-700">
              {t("participationFeeBreakdown")}
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="bg-green-50 rounded p-2">
                <span className="font-bold text-green-700">Lagos:</span> 704 MAD
                HT
                <br />
                <span className="text-xs">{t("cityInfo2")}.</span>
              </div>
              <div className="bg-green-50 rounded p-2">
                <span className="font-bold text-green-700">Kano:</span> 704 MAD
                HT
                <br />
                <span className="text-xs">{t("cityInfo2")}.</span>
              </div>
              <div className="bg-green-50 rounded p-2">
                <span className="font-bold text-green-700">Abuja:</span> 704 MAD
                HT
                <br />
                <span className="text-xs">{t("cityInfo2")}.</span>
              </div>
              <div className="bg-yellow-50 rounded p-2">
                <span className="font-bold text-yellow-700">
                  {t("Tax")} 20%:
                </span>{" "}
                140.80 MAD {t("perCity")}
              </div>
            </div>
          </div>
        )}

        <p className="text-fontColor text-center mb-4 text-base font-medium">
          {t("paymentProceed")}
        </p>
        {total > 0 && (
          <h1 className="font-bold text-2xl text-blue-700 mb-4">
            Total: {Number(total).toLocaleString()} MAD TTC
          </h1>
        )}
        {cities.length > 0 && (
          <div className="w-full mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <span className="inline-block w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                ✓
              </span>
              {t("selectedCities")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="bg-green-50 border border-green-300 rounded-lg px-4 py-2 text-green-800 font-semibold shadow-sm flex items-center gap-2"
                >
                  <span className="inline-block w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-xs">
                    {index + 1}
                  </span>
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 w-full mb-6">
          {/* Nigerian Account (uncomment if needed)
          <div className="flex flex-col bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Nigerian Account 🇳🇬</h2>
            <div className="flex items-center gap-2"><span className="font-bold">ACCOUNT NAME:</span> <span>CONSCCIMA</span></div>
            <div className="flex items-center gap-2"><span className="font-bold">ACCOUNT NUMBER:</span> <span>0002225410</span></div>
            <div className="flex items-center gap-2"><span className="font-bold">BANK NAME/BRANCH:</span> <span>UNITY BANK PLC</span></div>
          </div>
          */}
          <div className="flex flex-col bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h2 className="text-xl font-semibold mb-2">Moroccan Account 🇲🇦</h2>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("accountName")}:</span>{" "}
              <span className="text-blue-700">SPECTRE TRANS-TRADE GLOBAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">RIB:</span>{" "}
              <span>007 810 0001593000003349 42</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("bankName")}:</span>{" "}
              <span>ATTIJARIWAFA BANK</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">SWIFT CODE:</span>{" "}
              <span>BCMAMAMC</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white w-full py-2 text-lg font-semibold rounded-lg shadow hover:from-green-600 hover:to-blue-600 transition-colors duration-200"
        >
          {t("backHome")}
        </Button>
      </div>
    </div>
  );
}
