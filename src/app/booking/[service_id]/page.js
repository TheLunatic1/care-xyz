"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function BookingPage({ params }) {
  const serviceId = params.service_id || "";

  // Service name & hourly rate
  const serviceConfig = {
    "baby-care": { name: "Baby Care", hourlyRate: 500 },
    "elderly-service": { name: "Elderly Service", hourlyRate: 600 },
    "sick-people": { name: "Special Care for Sick People", hourlyRate: 800 },
  };

  const config = serviceConfig[serviceId] || { name: "Unknown Service", hourlyRate: 0 };
  const serviceName = config.name;
  const hourlyRate = config.hourlyRate;

  // Form state
  const [durationAmount, setDurationAmount] = useState("");
  const [durationType, setDurationType] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];

  // Districts only Dhaka division
  const districts = division === "Dhaka"
    ? ["Dhaka", "Gazipur", "Narsingdi", "Tangail", "Manikganj", "Narayanganj", "Munshiganj"]
    : [];

  // Cities example
  const cities = (() => {
    if (district === "Dhaka") return ["Mirpur", "Gulshan", "Dhanmondi", "Uttara", "Mohammadpur"];
    if (district === "Gazipur") return ["Gazipur Sadar", "Tongi", "Kaliakoir"];
    return [];
  })();

  // Areas example
  const areas = (() => {
    if (city === "Mirpur") return ["Mirpur 1", "Mirpur 2", "Mirpur 10", "Mirpur 12"];
    if (city === "Gulshan") return ["Gulshan 1", "Gulshan 2", "Banani"];
    if (city === "Dhanmondi") return ["Dhanmondi 27", "Dhanmondi 32"];
    return [];
  })();

  // Calculate total cost
  const durationInHours =
    durationType === "days" && durationAmount
      ? Number(durationAmount) * 24
      : durationType === "hours" && durationAmount
      ? Number(durationAmount)
      : 0;

  const totalCost = durationInHours * hourlyRate;

  return (
    <main className="min-h-screen bg-background py-16 px-8">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-4xl text-primary text-center">
              Book {serviceName}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 space-y-12">
            <p className="text-center text-xl text-foreground/80">
              You are booking: <span className="font-bold text-primary">{serviceName}</span>
            </p>

            {/* Duration */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Select Duration</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="e.g. 8"
                    value={durationAmount}
                    onChange={(e) => setDurationAmount(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={durationType} onValueChange={setDurationType}>
                    <SelectTrigger id="type" className="mt-2">
                      <SelectValue placeholder="Hours or Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary">Location</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="division">Division</Label>
                  <Select value={division} onValueChange={setDivision}>
                    <SelectTrigger id="division" className="mt-2">
                      <SelectValue placeholder="Choose division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="district">District</Label>
                  <Select
                    value={district}
                    onValueChange={setDistrict}
                    disabled={districts.length === 0}
                  >
                    <SelectTrigger id="district" className="mt-2">
                      <SelectValue placeholder={districts.length === 0 ? "Select division first" : "Choose district"} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">City / Upazila</Label>
                  <Select
                    value={city}
                    onValueChange={setCity}
                    disabled={cities.length === 0}
                  >
                    <SelectTrigger id="city" className="mt-2">
                      <SelectValue placeholder={cities.length === 0 ? "Select district first" : "Choose city"} />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area">Area / Neighborhood</Label>
                  <Select
                    value={area}
                    onValueChange={setArea}
                    disabled={areas.length === 0}
                  >
                    <SelectTrigger id="area" className="mt-2">
                      <SelectValue placeholder={areas.length === 0 ? "Select city first" : "Choose area"} />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="full-address">Full Address</Label>
                <Textarea
                  id="full-address"
                  placeholder="House no, road, block, etc."
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Total Cost */}
            {durationInHours > 0 && hourlyRate > 0 && (
              <div className="text-center py-8 bg-primary/5 rounded-lg">
                <p className="text-2xl font-semibold text-primary">
                  Total Cost: ৳{totalCost.toLocaleString("en-BD")}
                </p>
                <p className="text-muted-foreground mt-2">
                  ({durationAmount} {durationType} × ৳{hourlyRate}/hour)
                </p>
              </div>
            )}

            {/* Confirm Button */}
            <div className="text-center">
              <Button size="lg" className="px-12 py-6 text-lg">
                Confirm Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}