"use client";

import { useTransition } from "react";
import { Button, Stack, CircularProgress } from "@mui/material";
import { approveVolunteerApplication, rejectVolunteerApplication } from "@/app/actions/admin";

export default function VolunteerActions({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  if (status !== "pending") return null;

  return (
    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        variant="contained"
        color="success"
        disabled={isPending}
        onClick={() => startTransition(() => approveVolunteerApplication(id))}
        sx={{ minWidth: 0, px: 1.5 }}
      >
        {isPending ? <CircularProgress size={16} /> : "Approve"}
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        disabled={isPending}
        onClick={() => startTransition(() => rejectVolunteerApplication(id))}
        sx={{ minWidth: 0, px: 1.5 }}
      >
        Reject
      </Button>
    </Stack>
  );
}
