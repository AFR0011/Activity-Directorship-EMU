// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo?: string;
    role: "student" | "clubPresident" | "admin";
};

export type UpdateUserParams = {
    firstName?: string;
    lastName?: string;
    username?: string;
    photo?: string;
    role?: "student" | "clubPresident" | "admin";
};

// ====== CLUB PARAMS
export type CreateClubParams = {
    name: string;
    description: string;
    category: string;
    presidentId: string;
};

export type UpdateClubParams = {
    name?: string;
    description?: string;
    category?: string;
    presidentId?: string;
};

export type Club = {
    _id: string;
    name: string;
    description: string;
    category: string;
    president: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    members: Array<{
        _id: string;
        firstName: string;
        lastName: string;
    }>;
};

// ====== EVENT PARAMS
export type CreateEventParams = {
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    clubId: string;
    organizerId: string;
    startDate: Date;
    endDate: Date;
    location: string;
    resources?: string[];
};

export type UpdateEventParams = {
    title?: string;
    description?: string;
    category?: string;
    imageUrl?: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    resources?: string[];
};

export type Event = {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    club: {
        _id: string;
        name: string;
    };
    organizer: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    startDate: Date;
    endDate: Date;
    location: string;
    participants: Array<{
        _id: string;
        firstName: string;
        lastName: string;
    }>;
    resources?: string[];
};

// ====== MEMBERSHIP PARAMS
export type CreateMembershipParams = {
    userId: string;
    clubId: string;
    status: "pending" | "approved" | "rejected";
};

export type UpdateMembershipParams = {
    status: "approved" | "rejected";
};

export type Membership = {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    club: {
        _id: string;
        name: string;
    };
    status: "pending" | "approved" | "rejected";
};

// ====== EVENT REGISTRATION PARAMS
export type CreateEventRegistrationParams = {
    userId: string;
    eventId: string;
};

export type UpdateEventRegistrationParams = {
    attendanceConfirmed: boolean;
};

export type EventRegistration = {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    event: {
        _id: string;
        title: string;
    };
    attendanceConfirmed: boolean;
};

// ====== FEEDBACK PARAMS
export type CreateFeedbackParams = {
    userId: string;
    clubId?: string;
    eventId?: string;
    feedbackText: string;
};

export type Feedback = {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    club?: {
        _id: string;
        name: string;
    };
    event?: {
        _id: string;
        title: string;
    };
    feedbackText: string;
    createdAt: Date;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }