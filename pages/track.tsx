"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const mockTracking = {
  id: "ORD-2024-001234",
  status: "shipped",
  steps: [
    { label: "Order Placed", time: "Mon, 20 Jan — 10:30 AM", done: true },
    { label: "Processing", time: "Mon, 20 Jan — 2:15 PM", done: true },
    { label: "Shipped", time: "Tue, 21 Jan — 9:00 AM", done: true },
    { label: "Out for Delivery", time: "Expected Wed, 22 Jan", done: false },
    { label: "Delivered", time: "", done: false },
  ],
};

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof mockTracking | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (query.trim().toUpperCase().startsWith("ORD-")) {
      setResult(mockTracking);
    } else {
      setResult(null);
    }
  };

  const statusIcon = {
    pending: <Clock className="w-6 h-6 text-warning" />,
    processing: <Package className="w-6 h-6 text-primary" />,
    shipped: <Truck className="w-6 h-6 text-info" />,
    delivered: <CheckCircle className="w-6 h-6 text-success" />,
  };

  return (
    <div className="py-6 md:py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-2">Track Your Order</h1>
      <p className="text-muted-foreground text-center mb-8">Enter your order ID to see live delivery status.</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. ORD-2024-001234"
            className="w-full pl-10 pr-4 py-2.5 bg-muted rounded-xl border border-border text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Track
        </button>
      </form>

      {searched && !result && (
        <div className="text-center py-10 bg-muted/30 rounded-2xl">
          <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground">Order not found. Please check your order ID.</p>
        </div>
      )}

      {result && (
        <div className="bg-background border border-border rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            {statusIcon[result.status as keyof typeof statusIcon]}
            <div>
              <p className="font-semibold text-foreground">{result.id}</p>
              <p className="text-sm text-muted-foreground capitalize">{result.status}</p>
            </div>
          </div>

          <div className="space-y-0">
            {result.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2",
                    step.done ? "bg-primary border-primary" : "bg-background border-muted-foreground/30"
                  )} />
                  {i < result.steps.length - 1 && (
                    <div className={cn(
                      "w-0.5 flex-1 min-h-[24px]",
                      step.done ? "bg-primary" : "bg-border"
                    )} />
                  )}
                </div>
                <div className={cn("pb-5", !step.done && "opacity-50")}>
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                  {step.time && <p className="text-xs text-muted-foreground">{step.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}