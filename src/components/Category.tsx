"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCards from "./ProductCards";
import { pizzaProducts, beveragesProducts } from "@/data/product";
import { motion, AnimatePresence } from "framer-motion";

export default function Category() {
  return (
    <section>
      <div className="container py-12 mx-auto">
        <Tabs defaultValue="pizza">
          <TabsList>
            <TabsTrigger value="pizza" className="font-medium">
              Pizza
            </TabsTrigger>
            <TabsTrigger value="beverages" className="font-medium">
              Beverages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pizza">
            <AnimatePresence mode="wait">
              <motion.div
                key="pizza"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-10"
              >
                {pizzaProducts.map((product) => (
                  <ProductCards product={product} key={product.id} />
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="beverages">
            <AnimatePresence mode="wait">
              <motion.div
                key="beverages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-10"
              >
                {beveragesProducts.map((product) => (
                  <ProductCards product={product} key={product.id} />
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
