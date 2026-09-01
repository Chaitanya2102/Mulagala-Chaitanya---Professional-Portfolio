import React, { useState } from 'react';
import { Calendar, Users, MapPin, CheckCircle2, CreditCard, Sparkles, Plane, Compass } from 'lucide-react';

interface TourPackage {
  id: string;
  name: string;
  location: string;
  duration: string;
  basePrice: number;
  rating: number;
  highlight: string;
}

const packages: TourPackage[] = [
  {
    id: 'bali-paradise',
    name: 'Bali Tropical Island & Cultural Odyssey',
    location: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    basePrice: 850,
    rating: 4.9,
    highlight: 'Ubud rice terraces, sunset temples, private villa & reef snorkeling'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alpine Highlights & Glacier Express',
    location: 'Interlaken & Zermatt, Switzerland',
    duration: '6 Days / 5 Nights',
    basePrice: 1450,
    rating: 4.95,
    highlight: 'Matterhorn viewing, panoramic railway, alpine lake cruise'
  },
  {
    id: 'rajasthan-heritage',
    name: 'Royal Rajasthan Heritage & Golden Forts',
    location: 'Jaipur & Udaipur, India',
    duration: '5 Days / 4 Nights',
    basePrice: 420,
    rating: 4.85,
    highlight: 'Palace stays, desert camel safari, folk cultural evenings'
  }
];

export const TourBookingSimulator: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage>(packages[0]);
  const [travelers, setTravelers] = useState<number>(2);
  const [travelDate, setTravelDate] = useState<string>('2026-10-15');
  const [paymentOption, setPaymentOption] = useState<'card' | 'paypal'>('card');
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const totalPrice = selectedPackage.basePrice * travelers;
  const taxes = Math.round(totalPrice * 0.08);
  const grandTotal = totalPrice + taxes;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `WNDR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-200">
            Interactive Tour Booking Engine Demo (Angular + Node.js API)
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
          ● Real-Time Inventory Connected
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Package Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Select Destination Package:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                onClick={() => {
                  setSelectedPackage(pkg);
                  setIsBooked(false);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedPackage.id === pkg.id
                    ? 'bg-cyan-950/40 border-cyan-500 text-slate-100 ring-1 ring-cyan-500/50 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {pkg.location}
                  </span>
                  <span className="text-amber-400 font-mono">★ {pkg.rating}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">{pkg.name}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-800/60 font-mono">
                  <span>{pkg.duration}</span>
                  <span className="text-cyan-300 font-bold">${pkg.basePrice} / person</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form and Summary */}
        {!isBooked ? (
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                Trip Customization & Travelers
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Departure Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">Traveler Count</label>
                  <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="px-3 py-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono text-xs text-cyan-300 font-bold">
                      {travelers} {travelers === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers(travelers + 1)}
                      className="px-3 py-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Payment Gateway Simulation</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentOption('card')}
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                      paymentOption === 'card'
                        ? 'bg-cyan-950/50 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Credit / Debit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentOption('paypal')}
                    className={`p-2 rounded-lg border text-left flex items-center gap-2 ${
                      paymentOption === 'paypal'
                        ? 'bg-cyan-950/50 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    PayPal Instant
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Pricing Breakdown
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Base package ({travelers} × ${selectedPackage.basePrice}):</span>
                    <span className="font-mono">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Taxes & Port Fees (8%):</span>
                    <span className="font-mono">${taxes}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Early Bird Discount:</span>
                    <span className="font-mono">-$0.00</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-slate-100">
                    <span>Total Amount:</span>
                    <span className="font-mono text-cyan-300">${grandTotal}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Reserve & Simulate Instant Booking
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-emerald-950/30 border border-emerald-500/40 p-6 rounded-xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-emerald-300">
              Booking Reservation Confirmed!
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Simulated reservation for <strong>{selectedPackage.name}</strong> for {travelers} guests on {travelDate}. Automated confirmation ticket generated.
            </p>
            <div className="inline-block bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-lg font-mono text-xs text-cyan-400 font-bold">
              Booking Reference: {bookingRef}
            </div>
            <div>
              <button
                onClick={() => setIsBooked(false)}
                className="mt-2 text-xs text-slate-400 hover:text-slate-200 underline"
              >
                ← Test Another Booking Scenario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
