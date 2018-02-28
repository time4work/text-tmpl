<template>
	<div>
		<h1>sad</h1>
		<p>{{ $route.params.id }}</p>
		<section class="tmpl-section">
		<div class="container">
		<div class="row">
			
			<div class="col-sm-8">
				<form id="tmpl-console">
					<input class='form-control' type="text" name="console">
				</form>
				<div class="console-show"></div>
			</div>
			<div class="col-sm-4">
				<form id='key-form'>
					<input class='form-control' type="text" name="key">
					<input class='form-control' type="submit" value='add key'>
				</form>	
				<hr>
				<div class="key-value-show">
					<ul class="key-list">
						<li class="key-item">
							<form class='key-value-form' onsubmit='addValueToKey(this,event)'>
								<div class="key-delete">
									<button class="btn btn-danger" key-id="14" type="button" onclick="deleteKey(this,event)">
	                                    <i class="fa fa-trash" aria-hidden="true"></i> 
	                                </button>
								</div>
								<div class="key-value">
									<span>< key1 ></span>
								</div>
								<hr>
								<div class="key-value-list">
									<ul class='value-list'>
										<li>
											<span>value 1</span>
											<button class="btn" type="button" onclick="deleteKeyValue(this,event)">
	                                            <i class="fa fa-times" aria-hidden="true"></i> 
	                                        </button>
										</li>
										<li>
											<span>value 2</span>
											<button class="btn" type="button" onclick="deleteKeyValue(this,event)">
	                                            <i class="fa fa-times" aria-hidden="true"></i> 
	                                        </button>
										</li>
									</ul>
									<p>
										<input class="form-control" type="text" name="value"></input>
										<button type="submit" class="btn btn-success"> 
	                                        <i class="fa fa-plus"></i> 
	                                    </button>
									</p>
								</div>
							</form>
						</li>
						<li class="key-item">
							<form class='key-value-form' onsubmit='addValueToKey(this,event)'>
								<div class="key-delete">
									<button class="btn btn-danger" key-id="14" type="button" onclick="deleteKey(this,event)">
	                                    <i class="fa fa-trash" aria-hidden="true"></i> 
	                                </button>
								</div>
								<div class="key-value">
									<span>< key2 ></span>
								</div>
								<hr>
								<div class="key-value-list">
									<ul class='value-list'>
										<li>
											<span>value 1</span>
											<button class="btn" type="button" onclick="deleteKeyValue(this,event)">
	                                            <i class="fa fa-times" aria-hidden="true"></i> 
	                                        </button>
										</li>
										<li>
											<span>value 2</span>
											<button class="btn" type="button" onclick="deleteKeyValue(this,event)">
	                                            <i class="fa fa-times" aria-hidden="true"></i> 
	                                        </button>
										</li>
									</ul>
									<p>
										<input class="form-control" type="text" name="value"></input>
										<button type="submit" class="btn btn-success"> 
	                                        <i class="fa fa-plus"></i> 
	                                    </button>
									</p>
								</div>
							</form>
						</li>
					</ul>
				</div>
			</div>
		


		</div>
		</div>
		</section>
	</div>
</template>
<script>
export default {
  name: 'TmplPage',
  data () {
    return {
      title: ''
    }
  }
}
</script>

<style >

</style>
