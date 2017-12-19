// ==PREPROCESSOR==
// @name "Fade In Track Info"
// @version "1.0"
// @import "%fb2k_path%skins\Mnlt2\Common.js"
// ==/PREPROCESSOR==

var metadb = fb.IsPlaying ? fb.GetNowPlaying() : fb.GetFocusItem();
var alpha = new FadeAnim(255);
var offset = new FadeAnim(0);
var offset2 = new FadeAnim(0);

function on_mouse_rbtn_up() {
	if (!utils.IsKeyPressed(0x10)) {
		return true;
	}
}

function on_playback_new_track(info){
	metadb = fb.GetNowPlaying();
	alpha.Count = 0;
	offset.Count = -180;
	offset2.Count = -120;
	alpha.Fade(255, 10);
	offset.Fade(0, 12);
	offset2.Fade(0, 12);
}

function on_playback_seek(time){
	window.Repaint();
}

function on_playback_time(time){
	window.Repaint();
}

function on_item_focus_change() {
	if (!fb.IsPlaying) {
		metadb = fb.GetFocusItem();
		window.Repaint();
	}
}

function on_paint(gr) {
	var ww = window.Width;
	var wh = window.Height;
	gr.FillSolidRect(0, 0, ww, wh, window.GetColorCUI(1));
	if (metadb) {
		var info;
		gr.SetTextRenderingHint(5);
		if (info!=metadb.GetFileInfo()) {
			info = metadb.GetFileInfo();
			var titleF = fb.TitleFormat(info.MetaValue(info.MetaFind("TITLE"), 0) ? "%title%" : "$ifgreater($strchr(%filename%,-),0,$trim($substr(%filename%,$add($strchr(%filename%,-),1),100)),%title%)");
			var artistF = fb.TitleFormat("$if2(%artist%,$ifgreater($strchr(%filename%,-),0,$trim($substr(%filename%,1,$sub($strchr(%filename%,-),1))),%artist%))");
			gr.DrawString(fb.IsPlaying ? titleF.Eval() + "\n" + artistF.Eval() : titleF.EvalWithMetadb(metadb) + "\n" + artistF.EvalWithMetadb(metadb), gdi.Font("Segoe UI", 18, 1), RGBA(0, 128, 255, alpha.Count), 0, offset.Count, ww, wh-20, StringFormat(1, 1, 3, 0x00002000));
		}
		gr.DrawString(fb.IsPlaying ? fb.TitleFormat("%playback_time%[ / %length%]").Eval() : fb.TitleFormat("[%length%]").EvalWithMetadb(metadb), gdi.Font("Segoe UI", 20, 1), RGBA(128, 128, 128, alpha.Count), 0, offset2.Count, ww, wh, StringFormat(1, 2));
	}
}

// wirtten by matif
