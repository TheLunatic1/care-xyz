import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ServiceDetail({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id || "";

  let title = "Service Not Found";
  let description = "Sorry, this service is not available at the moment. Please browse our other caring services.";
  let features = [];
  let image = "https://www.shutterstock.com/image-illustration/bokeh-light-beige-abstract-background-600nw-1080828776.jpg";
  let imageAlt = "Soft warm beige abstract background with gentle bokeh - serene and caring atmosphere";

  if (id === "baby-care") {
    title = "Baby Care";
    description = "Loving and professional babysitting for infants and young children. Our caregivers are experienced, background-checked, and focused on fun, safety, and early development.";
    features = [
      "Playful activities and educational games",
      "Feeding, diapering, and nap routines",
      "CPR-certified and child safety trained",
      "Flexible hours including evenings and weekends"
    ];
    image = "https://thumbs.dreamstime.com/b/babysitter-child-cartoon-characters-set-sketch-vector-illustration-isolated-babysitter-child-cartoon-characters-set-sketch-187350636.jpg";
    imageAlt = "Gentle cartoon illustration of babysitter playing with happy children - soft pastel caring style";
  } else if (id === "elderly-service") {
    title = "Elderly Service";
    description = "Compassionate in-home care for seniors. We help with daily activities, companionship, and maintaining independence with dignity and warmth.";
    features = [
      "Assistance with mobility and personal care",
      "Medication reminders and meal preparation",
      "Light housekeeping and errands",
      "Engaging conversation and emotional support"
    ];
    image = "https://thumbs.dreamstime.com/b/compassionate-female-caregiver-supporting-elderly-woman-sitting-chair-simple-vector-illustration-white-friendly-uniform-402271963.jpg";
    imageAlt = "Warm illustration of caregiver supporting elderly person - compassionate soft pastel style";
  } else if (id === "sick-people") {
    title = "Special Care for Sick People";
    description = "Professional nursing support at home during illness or recovery. Gentle care to help patients heal comfortably with medical expertise and kindness.";
    features = [
      "Post-surgery or illness recovery support",
      "Wound care and vital monitoring",
      "Pain management and comfort care",
      "Coordination with doctors and family"
    ];
    image = "https://thumbs.dreamstime.com/b/tender-nurse-caring-child-patient-resting-comfortably-bed-illustration-soft-lighting-light-blue-beige-colors-410465113.jpg";
    imageAlt = "Tender nurse caring for patient in bed - soft pastel gentle illustration with calm lighting";
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 px-8 -mt-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-primary">About {title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg mb-8">
                {description}
              </CardDescription>

              {features.length > 0 && (
                <>
                  <h3 className="text-2xl font-semibold text-primary mb-4">What We Offer</h3>
                  <ul className="grid md:grid-cols-2 gap-4 mb-10">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-secondary mr-3 mt-1 text-xl">♥</span>
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="text-center">
                <Link href={`/booking/${id}`}>
                  <Button size="lg" className="text-lg px-10 py-6">
                    Book This Service
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}