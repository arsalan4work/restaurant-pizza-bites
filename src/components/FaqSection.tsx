// components/FaqSection.tsx

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export default function FaqSection() {
    return (
      <section className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          📌 Frequently Asked Questions
        </h2>
  
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="q1">
            <AccordionTrigger>How long does delivery take?</AccordionTrigger>
            <AccordionContent>
              Delivery typically takes 45 minutes depending on your location.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="q2">
            <AccordionTrigger>Do you offer gluten-free options?</AccordionTrigger>
            <AccordionContent>
              Yes! We offer gluten-free crusts for most of our pizzas.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="q3">
            <AccordionTrigger>Can I customize my toppings?</AccordionTrigger>
            <AccordionContent>
              Absolutely! You can add or remove toppings when placing your order.
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem value="q4">
            <AccordionTrigger>Do you have a loyalty or rewards program?</AccordionTrigger>
            <AccordionContent>
              Yes! Earn points with every order and redeem them for discounts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    )
  }
  