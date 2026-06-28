-- Demo seed data for local Supabase. These records mirror the in-app demo data.
-- For hosted Supabase, create auth users through Supabase Auth first, then insert matching profile IDs.

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'ava@example.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Ava Thompson"}', now(), now()),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'liam@example.com', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Liam Nguyen"}', now(), now()),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'sam@northernriversauto.example', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Sam Rivera"}', now(), now()),
  ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@reversecarmarket.example', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"name":"Mahmood"}', now(), now())
on conflict (id) do nothing;

insert into public.users_profile (id, role, name, email, phone, location) values
  ('00000000-0000-0000-0000-000000000101', 'buyer', 'Ava Thompson', 'ava@example.com', '0400 111 222', 'Gold Coast'),
  ('00000000-0000-0000-0000-000000000102', 'buyer', 'Liam Nguyen', 'liam@example.com', null, 'Brisbane'),
  ('00000000-0000-0000-0000-000000000201', 'dealer', 'Sam Rivera', 'sam@northernriversauto.example', '02 5500 0123', 'Northern Rivers'),
  ('00000000-0000-0000-0000-000000000301', 'admin', 'Mahmood', 'admin@reversecarmarket.example', null, 'Sydney')
on conflict (id) do update set role = excluded.role, name = excluded.name, email = excluded.email;

insert into public.dealer_profiles (
  id,
  user_id,
  business_name,
  dealer_license,
  abn,
  address,
  website,
  phone,
  location,
  region,
  verified_status,
  subscription_tier,
  subscription_status,
  founding_dealer
) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000201', 'Northern Rivers Auto', 'MD-48201', '12 345 678 901', '18 Pacific Motorway, Tweed Heads NSW', 'https://example.com/northern-rivers-auto', '02 5500 0123', 'Northern Rivers', 'Northern Rivers / Gold Coast', 'verified', 'founding', 'pilot', true),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000201', 'Brisbane Family Motors', 'MD-61190', '98 765 432 100', '41 Logan Road, Brisbane QLD', null, '07 3100 4512', 'Brisbane', 'Greater Brisbane', 'pending', 'starter', 'trialing', false)
on conflict (id) do update set business_name = excluded.business_name;

insert into public.inventory_items (
  id,
  dealer_id,
  make,
  model,
  badge,
  year,
  price,
  kilometres,
  body_type,
  fuel_type,
  transmission,
  drivetrain,
  colour,
  location,
  rego_status,
  stock_number,
  service_history,
  warranty_details,
  description,
  status
) values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Toyota', 'Corolla', 'Ascent Sport', 2019, 19990, 88000, 'Hatchback', 'Petrol', 'Automatic', 'FWD', 'White', 'Northern Rivers', 'Registered', 'NRA-1028', 'Full service history', '3 month statutory warranty', 'Clean Corolla hatch with safety tech and economical running costs.', 'active'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Mazda', '3', 'Maxx', 2018, 17500, 94000, 'Hatchback', 'Petrol', 'Automatic', 'FWD', 'Blue', 'Northern Rivers', 'Registered', 'NRA-1033', 'Documented service history', 'Dealer warranty available', 'Practical Mazda 3 Maxx hatch suited to first-car buyers.', 'active'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Hyundai', 'i30', 'Active', 2020, 18990, 72000, 'Hatchback', 'Petrol', 'Automatic', 'FWD', 'Silver', 'Northern Rivers', 'Registered', 'NRA-1040', 'Full service history', 'Balance of manufacturer-style coverage may apply', 'Low-kilometre i30 Active with modern safety features.', 'active'),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Kia', 'Cerato', 'S', 2017, 14990, 110000, 'Hatchback', 'Petrol', 'Automatic', 'FWD', 'Grey', 'Northern Rivers', 'Registered', 'NRA-1017', 'Partial service history', '3 month statutory warranty', 'Budget-friendly Cerato hatch with automatic transmission.', 'active'),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'Toyota', 'RAV4', 'GX Hybrid', 2021, 42990, 65000, 'SUV', 'Hybrid', 'Automatic', 'AWD', 'Graphite', 'Brisbane', 'Registered', 'BFM-2201', 'Full Toyota service history', 'Dealer-backed warranty available', 'Hybrid family SUV with space, safety tech and low running costs.', 'active'),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'Toyota', 'Hilux', 'SR5', 2019, 38990, 102000, 'Ute', 'Diesel', 'Automatic', '4x4', 'Black', 'Brisbane', 'Registered', 'BFM-2214', 'Full service history', 'Extended warranty available', 'Work-ready Hilux SR5 with 4x4 drivetrain.', 'active')
on conflict (id) do update set price = excluded.price, status = excluded.status;

insert into public.buyer_wanted_cards (
  id,
  buyer_id,
  title,
  natural_language_request,
  make,
  model,
  body_type,
  transmission,
  min_year,
  max_kilometres,
  budget_max,
  location,
  radius_km,
  seller_type_preference,
  must_haves,
  dealbreakers,
  buying_timeframe,
  contact_preference,
  max_seller_responses,
  public_visibility,
  status,
  ai_summary
) values
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000101', 'Wanted: Toyota Corolla under $20k', 'I need a Toyota Corolla under $20k near Gold Coast, automatic and reliable.', 'Toyota', 'Corolla', 'Hatchback', 'Automatic', 2017, 120000, 20000, 'Gold Coast', 120, 'both', '["automatic","service history","reasonable kilometres"]', '["written-off history","manual transmission"]', 'Ready this month', 'Message first', 8, true, 'open', 'Buyer wants a reliable automatic Corolla under $20k near the Gold Coast.'),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000102', 'Wanted: reliable hatchback under $18k', 'Looking for an automatic hatchback under $18k, first car, low running costs.', null, null, 'Hatchback', 'Automatic', null, 125000, 18000, 'Northern Rivers', 100, 'dealer only', '["low running cost","service history","easy to insure"]', '["major accident history"]', '2-4 weeks', 'Email', 6, true, 'open', 'First-car buyer looking for an automatic hatchback under $18k.'),
  ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000101', 'Wanted: family SUV under $35k', 'Need a reliable family SUV under $35k around Brisbane with safety features.', null, null, 'SUV', 'Automatic', null, 90000, 35000, 'Brisbane', 80, 'both', '["family suitable","safety tech","service history"]', '["missing service history"]', 'This quarter', 'Message first', 10, true, 'open', 'Family buyer wants a safe SUV under $35k around Brisbane.')
on conflict (id) do update set title = excluded.title;

insert into public.dealer_match_cards (
  id,
  dealer_id,
  title,
  generated_from_inventory_ids,
  make,
  model,
  body_type,
  fuel_type,
  transmission,
  price_min,
  price_max,
  year_min,
  year_max,
  km_min,
  km_max,
  location,
  radius_km,
  buyer_use_case,
  description,
  possible_matches,
  status,
  visibility,
  views_count,
  interests_count
) values
  ('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Looking for a Toyota Corolla under $20k?', '["20000000-0000-0000-0000-000000000001"]', 'Toyota', 'Corolla', 'Hatchback', 'Petrol', 'Automatic', 18990, 20000, 2018, 2020, 70000, 120000, 'Gold Coast / Northern Rivers', 120, 'first car, daily driver, low running cost', 'A verified dealer has matching Corolla stock available for buyers looking for a practical hatchback.', '["Toyota Corolla Ascent Sport"]', 'published', 'public', 428, 31),
  ('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Looking for a reliable hatchback under $20k?', '["20000000-0000-0000-0000-000000000001","20000000-0000-0000-0000-000000000002","20000000-0000-0000-0000-000000000003","20000000-0000-0000-0000-000000000004"]', null, null, 'Hatchback', 'Petrol', 'Automatic', 14990, 19990, 2017, 2020, 72000, 110000, 'Northern Rivers / Gold Coast', 140, 'first car, work commute, daily driver', 'A verified dealer has matching hatchback stock available for practical, low-running-cost buyers.', '["Corolla","Mazda 3","i30","Cerato"]', 'published', 'public', 691, 47),
  ('40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Looking for a first car under $18k?', '["20000000-0000-0000-0000-000000000002","20000000-0000-0000-0000-000000000004"]', null, null, 'Hatchback', null, 'Automatic', 14990, 18000, 2017, 2018, 90000, 115000, 'Northern Rivers', 120, 'first car, student, budget buyer', 'A verified dealer has budget-friendly stock suited to first-car buyers.', '["Mazda 3","Kia Cerato"]', 'published', 'public', 344, 22),
  ('40000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'Looking for a family SUV under $35k?', '[]', null, null, 'SUV', null, 'Automatic', 28000, 35000, 2018, 2021, 50000, 95000, 'Brisbane', 90, 'family, school run, weekend trips', 'A verified dealer can help buyers looking for practical SUV options in this budget band.', '["RAV4","CX-5","Tucson","Sportage"]', 'published', 'public', 203, 16)
on conflict (id) do update set title = excluded.title;

insert into public.dealer_responses (
  id,
  buyer_wanted_card_id,
  dealer_id,
  inventory_item_id,
  price,
  message,
  availability,
  warranty_details,
  service_history,
  inspection_available,
  match_score,
  match_summary,
  warnings,
  status
) values
  ('50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 19990, 'This Corolla fits the budget, transmission and kilometres requested. Inspection available this week.', 'Available now', '3 month statutory warranty', 'Full service history', true, 'Strong match', 'This vehicle matches the requested model, budget, location and automatic transmission.', '[]', 'submitted'),
  ('50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 17500, 'Not a Corolla, but it is a strong first-car hatchback option under budget.', 'Available now', 'Dealer warranty available', 'Documented service history', true, 'Good match', 'This vehicle matches budget, body type and use case, but it is a related model rather than an exact make/model request.', '["Not an exact model match"]', 'viewed')
on conflict (id) do update set price = excluded.price;

insert into public.buyer_interests (
  id,
  dealer_match_card_id,
  name,
  email,
  phone,
  location,
  budget,
  timeframe,
  requirements,
  permission_to_contact,
  create_wanted_card,
  generated_wanted_card_id,
  status
) values
  ('60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002', 'Mia Collins', 'mia@example.com', '0412 555 019', 'Gold Coast', 19000, 'Ready this month', 'Automatic hatchback, reliable, service history preferred.', true, true, '30000000-0000-0000-0000-000000000002', 'new')
on conflict (id) do update set status = excluded.status;

insert into public.subscriptions (id, dealer_id, tier, status, stripe_customer_id, stripe_subscription_id) values
  ('70000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'founding', 'pilot', null, null),
  ('70000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'starter', 'trialing', 'cus_mock_001', 'sub_mock_001')
on conflict (id) do update set status = excluded.status;

insert into public.analytics_events (event_type, entity_type, entity_id, metadata) values
  ('dealer_match_viewed', 'dealer_match_card', '40000000-0000-0000-0000-000000000002', '{"source":"seed"}'),
  ('buyer_interest_created', 'buyer_interest', '60000000-0000-0000-0000-000000000001', '{"source":"seed"}'),
  ('wanted_card_created', 'buyer_wanted_card', '30000000-0000-0000-0000-000000000001', '{"source":"seed"}');
