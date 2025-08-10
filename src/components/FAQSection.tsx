import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="py-32 bg-surface-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-text-primary text-center mb-10">FAQs</h2>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>Do I need technical knowledge?</AccordionTrigger>
              <AccordionContent>No. If you can use WhatsApp, you can use ODIA.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Will it work with my existing WhatsApp Business?</AccordionTrigger>
              <AccordionContent>Yes. Keep your number. We just add AI power to it.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can it speak Pidgin?</AccordionTrigger>
              <AccordionContent>Yes. Lexi speaks fluent Nigerian English, Pidgin, and understands local context.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>What if I want to cancel?</AccordionTrigger>
              <AccordionContent>Cancel anytime. No questions asked. No hidden fees.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger>Is my business data safe?</AccordionTrigger>
              <AccordionContent>100% secure. Data stored in Nigeria. NDPR compliant.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
