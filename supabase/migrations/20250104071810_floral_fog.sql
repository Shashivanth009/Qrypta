/*
  # Create certificates table and storage

  1. New Tables
    - `certificates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `file_path` (text)
      - `name` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on certificates table
    - Add policies for authenticated users
*/

CREATE TABLE certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  file_path text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);