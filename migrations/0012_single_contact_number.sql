-- Replace both published phone numbers with a single current one, and keep
-- the WhatsApp link pointed at the same number.
update site_settings
set phones = '["+234 912 353 1899"]'::jsonb,
    whatsapp = 'https://wa.me/2349123531899'
where id = 1;
