"use client"

import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DeleteAccount() {
  const handleDelete = async () => {
    try {
      await authClient.deleteUser({ callbackURL: "/signup" })
      toast.success("Account deleted successfully")
    } catch {
      toast.error("Failed to delete account")
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Danger Zone</h2>
      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This action is irreversible. Please be certain before proceeding.
          </p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action is irreversible. Please be certain before
                  proceeding.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="mt-2 sm:mt-0"
                    type="submit"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  )
}
