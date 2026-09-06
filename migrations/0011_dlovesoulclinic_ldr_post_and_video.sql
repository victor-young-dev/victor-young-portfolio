-- More DLoveSoulClinic gallery content: a long-distance-relationships post
-- and its companion YouTube Short.

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/dlovesoulclinic-ldr-post.jpg', null, 'DLoveSoulClinic — Long-Distance Relationships Post', 1 from work_items where slug = 'dlovesoulclinic'
union all
select id, 'video', null, 'QubwS0MPTvQ', 'DLoveSoulClinic — Long-Distance Relationships (Short)', 2 from work_items where slug = 'dlovesoulclinic';
