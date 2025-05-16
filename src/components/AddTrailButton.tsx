"use client";

import { trailService } from "@/lib/clientServices";
import { Trail } from "@/types/trails";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";


// TODO: Add default image
// TODO: Upload Image instead of URL
const trailSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    distanceKm: z.number().min(0, "Distance must be a positive number"),
    durationMinutes: z.number().min(0, "Duration must be a positive number"),
    elevationGainMeters: z.number().min(0, "Elevation gain must be a positive number"),
    difficulty: z.enum(["T1", "T2", "T3", "T4", "T5"], {
        errorMap: () => ({ message: "Invalid difficulty level" }),
    }),
    imageUrl: z.string().url("Invalid URL").optional(),
    date: z.string().min(1, "Date is required"),

})

export default function AddTrailButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof trailSchema>>({
        resolver: zodResolver(trailSchema),
        defaultValues: {
            name: "",
            description: "",
            distanceKm: 0,
            durationMinutes: 0,
            elevationGainMeters: 0,
            difficulty: "T1",
            imageUrl: "",
            date: "",
        }
    })

    function onSubmit(values: z.infer<typeof trailSchema>) {
        addSampleTrail({
            ...values,
            imageUrl: values.imageUrl || "https://picsum.photos/id/1/1200/800",
        })
    }

    async function addSampleTrail(trailData: Trail) {
        setIsLoading(true);

        try {
            await trailService.addTrail(trailData);
            setDialogOpen(false);
            toast("Trail added successfully!", {
                style: {
                    background: "var(--primary)",
                }
            })
            form.reset();
        } catch (error) {
            toast.error("Failed to add trail", {
                style: {
                    background: "var(--destructive)",
                }
            })
            console.log("Error adding trail:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button disabled={isLoading}>
                        {isLoading ? "Adding..." : "Add Sample Trail"}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Trail</DialogTitle>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Trail Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Trail Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="distanceKm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Distance (km)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Distance in km"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.valueAsNumber;
                                                        if (!isNaN(value)) {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="durationMinutes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration (minutes)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Duration in minutes"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.valueAsNumber;
                                                        if (!isNaN(value)) {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="elevationGainMeters"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Elevation Gain (meters)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Elevation gain in meters"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.valueAsNumber;
                                                        if (!isNaN(value)) {
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="difficulty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Difficulty</FormLabel>
                                            <FormControl>
                                                <select {...field}>
                                                    <option value="T1">T1</option>
                                                    <option value="T2">T2</option>
                                                    <option value="T3">T3</option>
                                                    <option value="T4">T4</option>
                                                    <option value="T5">T5</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Image URL" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <Button type="submit" disabled={isLoading}>{isLoading ? "loading..." : "submit"}</Button>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}