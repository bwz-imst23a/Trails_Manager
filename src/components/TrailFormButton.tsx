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
    time: z.string().min(1, "Time is required"),
})

interface TrailFormButtonProps {
    trail?: Trail;
    trailId?: string;
}

export default function TrailFormButton(props: TrailFormButtonProps) {
    const { trail, trailId } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof trailSchema>>({
        resolver: zodResolver(trailSchema),
        defaultValues: {
            name: trail?.name || "",
            description: trail?.description || "",
            distanceKm: trail?.distanceKm || 0,
            durationMinutes: trail?.durationMinutes || 0,
            elevationGainMeters: trail?.elevationGainMeters || 0,
            difficulty: trail?.difficulty || "T1",
            imageUrl: trail?.imageUrl || "",
            date: trail?.date || "",
            time: trail?.time || "",
        }
    })

    function onSubmit(values: z.infer<typeof trailSchema>) {
        console.log(trail);

        if (trail || trailId) {
            updateTrail(trailId, {
                ...values,
                imageUrl: values.imageUrl || "https://picsum.photos/id/1/1200/800",
            })
        }
        else {
            addNewTrail({
                ...values,
                imageUrl: values.imageUrl || "https://picsum.photos/id/1/1200/800",
            })
        }
    }

    async function addNewTrail(trailData: Trail) {
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
            window.location.reload();
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

    async function updateTrail(id: string | undefined, trailData: Trail): Promise<void> {
        if (!id) {
            toast.error("Trail ID is missing. Cannot update trail.", {
                style: {
                    background: "var(--destructive)",
                }
            });
            return;
        }
        setIsLoading(true);

        try {
            await trailService.updateTrail(id, trailData)
            setDialogOpen(false);
            toast("Trail updated successfully!", {
                style: {
                    background: "var(--primary)",
                }
            })
            form.reset();
            window.location.reload();
        } catch (error: unknown) {
            toast.error("Failed to update trail", {
                style: {
                    background: "var(--destructive)",
                }
            })
            console.log("Error updating trail:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="bg-[var(--primary)] text-[var(--primary-foreground)] border-none px-4 sm:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 lg:py-4 xl:py-5 text-sm sm:text-base lg:text-lg xl:text-xl w-full sm:w-auto"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : (trail ? "Edit Trail" : "Add Trail")}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{trail ? "Edit Trail" : "Add Trail"}</DialogTitle>
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
                                                <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
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
                                                <Input placeholder="Image URL (optional)" {...field} />
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
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
                                >
                                    {isLoading ? "Loading..." : (trail ? "Update Trail" : "Add Trail")}
                                </Button>
                            </form>
                        </Form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}