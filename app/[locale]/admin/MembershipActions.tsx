"use client";

import { useTransition } from "react";
import { Button, Stack, CircularProgress } from "@mui/material";
import { updateMembershipStatus } from "@/app/actions/admin";

export default function MembershipActions({ id, status }: { id: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  if (status !== "pending") return null;

  return (
    <Stack direction="row" spacing={1}>
      <Button
        size="small"
        variant="contained"
        color="success"
        disabled={isPending}
        onClick={() => startTransition(() => updateMembershipStatus(id, "active"))}
        sx={{ minWidth: 0, px: 1.5 }}
      >
        {isPending ? <CircularProgress size={16} /> : "Activate"}
      </Button>
    </Stack>
  );
}
