"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export type JobFormValues = {
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
};

interface Props {
  onSuccess?: () => void;
  job?: { id: string } & JobFormValues;
}

export function AddJobDialog({ onSuccess, job }: Props) {
  const isEdit = Boolean(job);
  const { register, handleSubmit, reset, control } = useForm<JobFormValues>({
    defaultValues: job || { company: "", role: "", status: "Applied" },
  });

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: JobFormValues) => {
    setLoading(true);
    try {
      if (isEdit && job) {
        await fetch(`/api/jobs/${job.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/jobs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      setOpen(false);
      reset();
      onSuccess?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          {isEdit ? "Edit Job" : "Add Job"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Job" : "Add Job"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your application details." : "Create a new job application."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" {...register("company", { required: true })} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" {...register("role", { required: true })} />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field}>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
