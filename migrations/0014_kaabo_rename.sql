-- Rename the displayed "Kaabo" to its correct Yoruba spelling, "Káàbọ̀".
-- The slug, image path, and external launch-site URL are technical
-- identifiers and stay unchanged.
update work_items
set title = 'Káàbọ̀',
    body = replace(body, 'Kaabo', 'Káàbọ̀')
where slug = 'kaabo';

update ventures
set copy = replace(copy, 'Kaabo', 'Káàbọ̀')
where slug = 'labs';
