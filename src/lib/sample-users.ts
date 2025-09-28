export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  fullAddress?: string; // legacy/display convenience
};

export const users: User[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    addressLine1: "123 Maple St",
    addressLine2: "",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    fullAddress: "123 Maple St, Springfield, IL 62704",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Martinez",
    email: "bob.martinez@example.com",
    phone: "+1 (555) 987-6543",
    addressLine1: "456 Oak Ave",
    addressLine2: "",
    city: "Portland",
    state: "OR",
    zip: "97205",
    fullAddress: "456 Oak Ave, Portland, OR 97205",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Kim",
    email: "charlie.kim@example.com",
    phone: "+1 (555) 555-0123",
    addressLine1: "789 Pine Rd",
    addressLine2: "",
    city: "Boulder",
    state: "CO",
    zip: "80302",
    fullAddress: "789 Pine Rd, Boulder, CO 80302",
  },
];
