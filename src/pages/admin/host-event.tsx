import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Calendar, Image as ImageIcon, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Event description is required"),
  topic: z.string().min(1, "Event topic is required"),
  date: z.string().min(1, "Event date is required"),
  time: z.string().min(1, "Event time is required"),
  image: z.any().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function HostEvent() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  const onSubmit = (data: EventFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Event data:", data);
      toast.success("Event hosted successfully!");
      navigate("/admin/dashboard");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Host New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter event name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter event description"
                    {...register("description")}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="topic">Event Topic</Label>
                  <Select
                    onValueChange={(value) => setValue("topic", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.topic && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.topic.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Event Date</Label>
                    <Input
                      id="date"
                      type="date"
                      {...register("date")}
                      className={errors.date ? "border-red-500" : ""}
                    />
                    {errors.date && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="time">Event Time</Label>
                    <Input
                      id="time"
                      type="time"
                      {...register("time")}
                      className={errors.time ? "border-red-500" : ""}
                    />
                    {errors.time && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.time.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Event Banner</Label>
                  <div className="mt-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setImagePreview(null)}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload event banner
                          </p>
                        </div>
                      )}
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Event..." : "Host Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 