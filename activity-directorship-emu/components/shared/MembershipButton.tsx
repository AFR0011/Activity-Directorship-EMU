"use client";

import { useState, useEffect, useTransition } from "react";
import {
  createMembership,
  deleteMembership,
  getMembershipStatus,
} from "@/lib/actions/membership.actions";

type MembershipButtonProps = {
  clubId: string;
  userId: string;
  path: string;
};

const MembershipButton = ({ clubId, userId, path }: MembershipButtonProps) => {
  const [membershipStatus, setMembershipStatus] = useState<
    "approved" | "pending" | "none"
  >("none");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      try {
        const status = await getMembershipStatus({ userId, clubId });
        setMembershipStatus(status); // Can be 'approved', 'pending', or 'none'
      } catch (error) {
        console.error("Error fetching membership status", error);
      }
    };

    fetchMembershipStatus();
  }, [userId, clubId, path]);

  const handleMembership = () => {
    startTransition(async () => {
      if (membershipStatus === "approved") {
        await deleteMembership({ userId, clubId, path });
        setMembershipStatus("none");
      } else if (membershipStatus === "none") {
        await createMembership({ userId, clubId, path });
        setMembershipStatus("pending");
      }
    });
  };

  return (
    <button
      onClick={handleMembership}
      className="rounded-full bg-primary-500 px-6 py-3 text-white hover:bg-primary-600 disabled:bg-gray-400"
      disabled={isPending || membershipStatus === "pending"}
    >
      {isPending
        ? "Processing..."
        : membershipStatus === "approved"
        ? "Leave Membership"
        : membershipStatus === "pending"
        ? "Already Applied"
        : "Join Club"}
    </button>
  );
};

export default MembershipButton;
