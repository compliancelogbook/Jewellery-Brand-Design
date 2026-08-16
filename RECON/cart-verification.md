# Shopping Bag Verification

The Solis Ridge Ring was added from its product page with size M selected. The shopping-bag count updated from 0 to 1, the opened drawer showed the ring, its material, size, and £82.00 line total, and increasing the line quantity updated both the header count and subtotal to 2 items and £164.00.

The cart state is held in browser local storage and is designed to persist while the customer continues browsing.

After closing the drawer and navigating to The Bridal Edit, the header retained the two-item bag count, confirming the selected pieces persist across client-side browsing routes.

Reopening the drawer from The Bridal Edit displayed the persisted ring. Selecting Remove cleared the line item, reset the bag count to zero, and presented the intended empty-bag state.

The Checkout button now clearly explains that it is awaiting the separately requested Stripe integration, rather than implying that a payment can currently be completed.
