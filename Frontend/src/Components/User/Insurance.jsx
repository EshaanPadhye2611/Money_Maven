import React from "react";

const Insurance = () => {
  const insurancePolicies = [
    {
      id: 1,
      policy: "Health Insurance",
      buyingDate: new Date("2023-01-15"),
      quantity: 1,
      expiryDate: new Date("2027-01-15"),
      status: "Active"
    },
    {
      id: 2,
      policy: "Car Insurance",
      buyingDate: new Date("2022-05-20"),
      quantity: 1,
      expiryDate: new Date("2024-05-20"),
      status: "Expired"
    },
    {
      id: 3,
      policy: "Home Insurance",
      buyingDate: new Date("2023-03-10"),
      quantity: 1,
      expiryDate: new Date("2044-03-10"),
      status: "Active"
    },
    {
      id: 4,
      policy: "Travel Insurance",
      buyingDate: new Date("2024-06-01"),
      quantity: 1,
      expiryDate: new Date("2025-03-25"),
      status: "Expiring Soon"
    },
    {
      id: 5,
      policy: "Life Insurance",
      buyingDate: new Date("2021-11-25"),
      quantity: 1,
      expiryDate: new Date("2026-11-25"),
      status: "Active"
    },
    {
        id: 5,
        policy: "Pension Scheme",
        buyingDate: new Date("2021-11-02"),
        quantity: 1,
        expiryDate: new Date("2026-11-25"),
        status: "Active"
      },
      {
        id: 5,
        policy: "Accidental Insurance",
        buyingDate: new Date("2023-11-11"),
        quantity: 1,
        expiryDate: new Date("2026-11-25"),
        status: "Active"
      },
      {
        id: 5,
        policy: "Medical Insurance",
        buyingDate: new Date("2024-11-14"),
        quantity: 1,
        expiryDate: new Date("2029-11-25"),
        status: "Active"
      },
      
  ];

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-black">
      <div className="overflow-y-auto" style={{ maxHeight: "1200px" }}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Policy</th>
              <th className="text-left p-2 border-b">Buying Date</th>
              <th className="text-left p-2 border-b">Quantity</th>
              <th className="text-left p-2 border-b">Expiry Date</th>
              <th className="text-left p-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {insurancePolicies.length > 0 ? (
              insurancePolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-100">
                  <td className="p-2 border-b">{policy.policy}</td>
                  <td className="p-2 border-b">
                    {policy.buyingDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td className="p-2 border-b">{policy.quantity}</td>
                  <td className="p-2 border-b">
                    {policy.expiryDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td
                    className={`p-2 border-b ${
                      policy.status === "Expired"
                        ? "text-red-600 font-bold"
                        : policy.status === "Expiring Soon"
                        ? "text-yellow-600 font-bold"
                        : "text-green-600 font-bold"
                    }`}
                  >
                    {policy.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No Policies available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Insurance;