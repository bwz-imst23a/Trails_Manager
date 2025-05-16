"use client"

import React from 'react'
import { trailService } from '@/lib/clientServices'
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


interface Props { trailId: string }

function DeleteTrailButton(props: Props) {
    const { trailId } = props

    const router = useRouter()

    function handleDelete() {
        trailService.deleteTrail(trailId)
            .then(() => {
                console.log('Trail deleted successfully')
                router.push('/')
                toast.success('Trail deleted successfully')
            })
            .catch((error) => {
                console.log('Error deleting trail:', error)
                toast.error('Error deleting trail')
            })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[var(--color-destructive)] text-white border-none px-6 py-3 text-base">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your trail.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-grab'>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive cursor-grab' onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTrailButton
