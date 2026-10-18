export interface SimpleAddress {
    name?: string;
    street: string;
    number: number;
    city: string;
    state: string;
    postalCode: string;
    line?: string;
    type: 'SHIPPING' | 'BILLING' | 'BILLING_AND_SHIPPING';
}
