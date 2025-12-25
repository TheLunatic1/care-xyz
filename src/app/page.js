import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Care.xyz - Trusted Baby Sitting & Elderly Care Service",
  description:
    "Reliable, compassionate, and professional care for babies, elderly, and family members. Book trusted caregivers easily and securely.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-24 px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Caring Hearts for Your Loved Ones
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto">
            Reliable, trusted, and compassionate care for babies, elderly, and family members — whenever you need it.
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Find Care Now
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-primary mb-6">
              Why Choose Care.xyz?
            </h2>
            <p className="text-lg text-foreground/80 mb-6">
              We make caregiving simple, secure, and accessible for every family. Whether you need a trusted babysitter for date night, compassionate elderly care, or special support for sick loved ones — we connect you with reliable caregivers in your area.
            </p>
            <p className="text-lg text-foreground/80 mb-8">
              Our mission is to bring peace of mind to families, knowing that your loved ones are in safe, caring hands.
            </p>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              Learn More About Us
            </Button>
          </div>
          <div className="hidden md:block">
            <Card className="bg-primary/5 border-none shadow-lg">
              <CardContent className="p-12 text-center text-primary/70 text-2xl font-medium">
                Family First. Always.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-20 px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <Image 
                src="https://thumbs.dreamstime.com/b/babysitter-child-cartoon-characters-set-sketch-vector-illustration-isolated-babysitter-child-cartoon-characters-set-sketch-187350636.jpg"
                alt="Cute babysitter playing with children - gentle illustration"
                width={800}
                height={469}
                className="w-9/10 h-64 object-cover m-1 mx-auto rounded-md hover:border-2 border-primary transition-border"
              />
              <CardHeader>
                <CardTitle className="text-primary">Baby Care</CardTitle>
                <CardDescription>
                  Loving and playful babysitting for infants and young children. Experienced caregivers ensure fun, safety, and development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/service/baby-care" className="block">
                  <Button className="w-full">Book Baby Care</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <Image 
                src="https://thumbs.dreamstime.com/b/elderly-woman-female-caregiver-holding-hands-compassionate-support-scene-sharing-caring-moment-gentle-smile-bright-414902469.jpg"
                alt="Caregiver holding hands with elderly person - compassionate and warm"
                width={800}
                height={437}
                className="w-9/10 h-64 object-cover m-1 mx-auto rounded-md hover:border-2 border-primary transition-border"
              />
              <CardHeader>
                <CardTitle className="text-primary">Elderly Service</CardTitle>
                <CardDescription>
                  Compassionate daily assistance, companionship, and personalized care for seniors to live comfortably at home.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/service/elderly-service" className="block">
                  <Button className="w-full">Book Elderly Care</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <Image 
                src="https://thumbs.dreamstime.com/z/compassionate-nurse-clipart-scene-centered-composition-pastel-tones-soft-lighting-illustration-caring-381307325.jpg"
                alt="Compassionate nurse caring for patient - soft pastel illustration"
                width={1600}
                height={963}
                className="w-9/10 h-64 object-cover m-1 mx-auto rounded-md hover:border-2 border-primary transition-border"
              />
              <CardHeader>
                <CardTitle className="text-primary">Sick People Service</CardTitle>
                <CardDescription>
                  Professional in-home nursing and recovery support for patients needing medical care and comfort during illness.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/service/sick-people" className="block">
                  <Button className="w-full">Book Special Care</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            What Our Families Say ♥
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-foreground/80 italic mb-6">
                  "Care.xyz made finding a trustworthy babysitter so easy. Our kids love their caregiver!"
                </p>
                <p className="font-semibold text-primary">Sarah M., Dhaka</p>
                <p className="text-sm text-muted-foreground">Baby Care Client</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-foreground/80 italic mb-6">
                  "Compassionate care for my elderly parents. The platform is secure and user-friendly."
                </p>
                <p className="font-semibold text-primary">Ahmed K., Gazipur</p>
                <p className="text-sm text-muted-foreground">Elderly Service Client</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <p className="text-lg text-foreground/80 italic mb-6">
                  "Professional support during recovery. Highly recommend for sick care needs."
                </p>
                <p className="font-semibold text-primary">Fatima R., Narsingdi</p>
                <p className="text-sm text-muted-foreground">Special Care Client</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}