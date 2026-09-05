-- Adds real marketing assets to GBCH and DLoveSoulClinic's galleries.
-- (Favour Link's own gallery was already populated with the same images under
-- different titles by a separate pass, so it's deliberately left alone here.)

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/gbch-welcome-august-photo.png', null, 'GBCH — Welcome August (Photo)', 0 from work_items where slug = 'gbch'
union all
select id, 'image', '/work/gbch-welcome-august-poster.png', null, 'GBCH — Welcome August (Poster)', 1 from work_items where slug = 'gbch'
union all
select id, 'image', '/work/dlovesoulclinic-love-quote.jpg', null, 'DLoveSoulClinic — Love Quote Post', 0 from work_items where slug = 'dlovesoulclinic';
