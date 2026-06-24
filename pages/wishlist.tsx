"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { products, formatPrice } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";

const WISHLIST_KEY = "thomex_wishlist";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      if (raw) setWishlistIds(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds, mounted]);

  const remove = (id: string) => setWishlistIds((prev) => prev.filter((x) => x !== id));
  const clearAll = () => setWishlistIds([]);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (!mounted) return null;

  return (
    <div className="py-6 md:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">My Wishlist</h1>
        {wishlistProducts.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-destructive hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-2xl">
          <Heart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground/70 mb-4">Save items you love and find them here anytime.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="group relative bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-all">
              <Link href={`/product/${product.id}`} className="block relative aspect-square bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
              </Link>
              <div className="p-3">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm font-mono font-semibold text-foreground mb-2">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add
                  </button>
                  <button
                    onClick={() => remove(product.id)}
                    className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}