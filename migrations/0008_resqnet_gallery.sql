-- ResQNet's mobile app screenshots — the app already exists per its own copy
-- ("A mobile application already exists"), it just had no gallery yet.

insert into gallery_items (work_item_id, kind, src, youtube_id, title, sort_order)
select id, 'image', '/work/resqnet-splash-screen.jpg', null, 'ResQNet — Splash Screen', 0 from work_items where slug = 'resqnet'
union all
select id, 'image', '/work/resqnet-home-dashboard.jpg', null, 'ResQNet — Home Dashboard', 1 from work_items where slug = 'resqnet';
