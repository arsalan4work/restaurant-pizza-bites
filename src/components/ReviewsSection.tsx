"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

type Review = {
  name: string;
  comment: string;
  media?: string;
  mediaType?: "image" | "video";
  rating: number;
};

const initialReviews: Review[] = [
  {
    name: "Alice Johnson",
    comment: "Best pizza in town. The crust is out of this world! 🌟",
    media: "/pizza-main.png",
    mediaType: "image",
    rating: 5,
  },
  {
    name: "Brian Lee",
    comment: "Delicious, fresh, and super fast delivery!",
    media: "/pizza-main.png",
    mediaType: "image",
    rating: 5,
  },
  {
    name: "Carla Mendez",
    comment: "The veggie options are amazing. Will order again! 💚",
    media: "/pizza-main.png",
    mediaType: "image",
    rating: 4,
  },
  {
    name: "David Kim",
    comment: "Perfect balance of cheese, sauce, and toppings. 👌",
    media: "/pizza-main.png",
    mediaType: "image",
    rating: 5,
  },
  {
    name: "Emily Parker",
    comment: "Loved the customer service and quick response! 🔥",
    media: "/pizza-main.png",
    mediaType: "image",
    rating: 5,
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [media, setMedia] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment || rating === 0) {
      toast.error("Please fill in name, comment and rating.");
      return;
    }

    const newReview: Review = {
      name,
      comment,
      media: media ? URL.createObjectURL(media) : undefined,
      mediaType: media?.type.startsWith("video") ? "video" : "image",
      rating,
    };

    setReviews((prev) => [newReview, ...prev]);
    setName("");
    setComment("");
    setRating(0);
    setMedia(null);
    toast.success("Review submitted successfully!");
  };

  return (
    <section className="max-w-6xl mx-auto p-6 md:p-10 mt-16 space-y-16">
      <div>
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10">
          What Our Customers Say 💬
        </h2>

        <Carousel className="w-full">
          <CarouselContent>
            {reviews.map((r, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 p-4">
                <div className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2 text-yellow-500">
                      {Array(r.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{r.name}</p>
                    <p className="text-gray-700 mt-2">{r.comment}</p>
                  </div>
                  {r.media && r.mediaType === "image" && (
                    <div className="mt-4">
                      <Image
                        src={r.media}
                        alt="User review"
                        width={400}
                        height={300}
                        className="rounded-xl border"
                      />
                    </div>
                  )}
                  {r.media && r.mediaType === "video" && (
                    <video
                      controls
                      className="w-full max-w-full rounded-xl mt-4 border"
                      src={r.media}
                    />
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-between mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-10">
        <h3 className="text-2xl font-bold text-orange-700 mb-6">
          Leave a Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>

          <div>
            <Label htmlFor="comment">Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Write your experience..."
            />
          </div>

          <div>
            <Label htmlFor="media">Upload Image/Video (optional)</Label>
            <Input
              id="media"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMedia(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Rating:</Label>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={20}
                className={`cursor-pointer ${
                  i <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => setRating(i)}
              />
            ))}
          </div>

          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </div>
    </section>
  );
}
