
-- Drop the overly permissive update policy and replace with a more targeted one
-- Availability slots can only be updated to mark is_booked = true (one-way, no un-booking)
DROP POLICY "Authenticated users can update availability" ON public.availability;

CREATE POLICY "Authenticated users can book available slots"
  ON public.availability FOR UPDATE
  TO authenticated
  USING (is_booked = false)
  WITH CHECK (is_booked = true);
