// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    photo?: string;
    role: "student" | "admin";
};

export type UpdateUserParams = {
    firstName?: string;
    lastName?: string;
    username?: string;
    photo?: string;
    role?: "student" | "admin";
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
    imageUrl?: string;
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
};

// ====== EVENT PARAMS
export type CreateEventParams = {
    path: string;
    title: string;
    description: string;
    categoryId: string;
    imageUrl?: string;
    clubId: string;
    organizerId: string;
    startDate: Date;
    endDate: Date;
    location: string;
    resources?: string;
};

export type UpdateEventParams = {
    path: string;
    _id: string;
    title?: string;
    description?: string;
    categoryId?: string;
    imageUrl?: string;
    clubId: string;
    organizerId: string;
    startDate?: Date;
    endDate?: Date;
    location?: string;
    resources?: string;
};

export type DeleteEventParams = {
    path: string;
    eventId: string;
};

export type GetAllEventsParams = {
    query: string;
    limit: number;
    page: number;
    category: string;
};


export type GetEventsByUserParams = {
    userId: string;
    limit: number;
    page: number;
}

export type GetClubsByUserParams = {
    userId: string;
    limit: number;
    page: number;
}

export type GetRelatedEventsByCategoryParams = {
    categoryId: string;
    eventId: string;
    limit: number;
    page: number;
}

export type Event = {
    _id: string;
    title: string;
    description: string;
    category: string;
    imageUrl?: string;
    clubs: Array<{
        _id: string;
        name: string;
    }>;
    organizers: Array<{
        _id: string;
        firstName: string;
        lastName: string;
    }>;
    startDate: Date;
    endDate: Date;
    location: string;
    resources?: Array<string>;
};

// ====== MEMBERSHIP PARAMS
export type CreateMembershipParams = {
    userId: string;
    clubId: string;
    status: "pending" | "approved" | "rejected";
};

export type UpdateMembershipParams = {
    status: "approved" | "pending" | "rejected";
};

export type DeleteMembershipParams = {
    clubId: string;
    userId: string;
    path: string;
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
    status: "pending" | "approved" | "rejected";
};

export type UpdateEventRegistrationParams = {
    status: "pending" | "approved" | "rejected";
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
    status: "pending" | "approved" | "rejected";
};

// ====== FEEDBACK PARAMS
export type CreateFeedbackParams = {
    userId: string;
    reference: string;
    rating: number;
    comments?: string;
};

export type Feedback = {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    reference: string;
    comments: string;
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
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  };
  

  // ====== Order params

  export type CheckoutOrderParams = {
    eventTitle: string,
    eventId: string,
    price: string,
    isFree: boolean,
    buyerId: string
  }

  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }