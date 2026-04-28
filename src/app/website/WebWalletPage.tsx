import { WALLET_CONTRACT } from '../data/frontendContracts';

export const WebWalletPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Wallet & Transactions</h1>
      <p className="text-gray-600 mb-6">Frontend-ready wallet and payment history placeholder.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400">Current Balance</p>
          <p className="text-2xl font-bold text-gray-900">৳{WALLET_CONTRACT.summary.currentBalance.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-400">Pending Refund</p>
          <p className="text-2xl font-bold text-orange-600">৳{WALLET_CONTRACT.summary.pendingRefund.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 text-sm text-gray-600 space-y-2">
        {WALLET_CONTRACT.transactions.map(txn => (
          <p key={txn.id}>• {txn.id} — {txn.method} — ৳{txn.amount.toLocaleString()}</p>
        ))}
      </div>
    </section>
  );
};
